# from pathlib import Path

# import scrapy


# class QuotesSpider(scrapy.Spider):
#     name = "quotes"

#     async def start(self):
#         urls = [
#             "https://www.facebook.com/negrospowerph/",
#             "https://www.facebook.com/murciawaterdistrict/",
#         ]
#         for url in urls:
#             yield scrapy.Request(url=url, callback=self.parse)

#     def parse(self, response):
#         page = response.url.split("/")[-2]
#         filename = f"quotes-{page}.html"
#         Path(filename).write_bytes(response.body)
#         self.log(f"Saved file {filename}")



import re
from datetime import datetime, timedelta
from urllib.parse import urljoin
from zoneinfo import ZoneInfo

import scrapy
from scrapy_playwright.page import PageMethod


MANILA_TZ = ZoneInfo("Asia/Manila")


class QuotesSpider(scrapy.Spider):
    name = "quotes"

    custom_settings = {
        "ROBOTSTXT_OBEY": False,
        "DOWNLOAD_DELAY": 2,
        "CONCURRENT_REQUESTS_PER_DOMAIN": 1,
        "LOG_LEVEL": "INFO",

        "DOWNLOAD_HANDLERS": {
            "http": (
                "scrapy_playwright.handler."
                "ScrapyPlaywrightDownloadHandler"
            ),
            "https": (
                "scrapy_playwright.handler."
                "ScrapyPlaywrightDownloadHandler"
            ),
        },

        "TWISTED_REACTOR": (
            "twisted.internet.asyncioreactor."
            "AsyncioSelectorReactor"
        ),

        "PLAYWRIGHT_BROWSER_TYPE": "chromium",

        "PLAYWRIGHT_LAUNCH_OPTIONS": {
            "headless": True,

            # Uses your installed Google Chrome.
            # Remove this line when using Playwright Chromium.
            "channel": "chrome",
        },

        "PLAYWRIGHT_DEFAULT_NAVIGATION_TIMEOUT": 60000,
    }

    async def start(self):
        urls = [
            "https://www.facebook.com/negrospowerph/",
            "https://www.facebook.com/murciawaterdistrict/",
            "https://www.facebook.com/NGCPph/",
            "https://www.facebook.com/PAGASA.DOST.GOV.PH/",
            "https://www.facebook.com/profile.php?id=61573925486634/",
        ]

        for url in urls:
            yield scrapy.Request(
                url=url,
                callback=self.parse,
                errback=self.errback,
                dont_filter=True,
                meta={
                    "playwright": True,
                    "playwright_include_page": True,
                    "playwright_page_methods": [
                        PageMethod(
                            "wait_for_timeout",
                            6000,
                        ),
                    ],
                },
            )

    async def parse(self, response):
        page = response.meta.get("playwright_page")

        if page is None:
            self.logger.error(
                "Playwright page was not included for %s",
                response.url,
            )
            return

        try:
            # Load several recent posts.
            for _ in range(4):
                await page.evaluate(
                    """
                    window.scrollTo(
                        0,
                        document.body.scrollHeight
                    )
                    """
                )
                await page.wait_for_timeout(2500)

            articles = page.locator('div[role="article"]')
            article_count = await articles.count()

            self.logger.info(
                "Found %d possible articles on %s",
                article_count,
                response.url,
            )

            today = datetime.now(MANILA_TZ).date()
            yielded_urls = set()
            matched_count = 0

            for index in range(article_count):
                article = articles.nth(index)

                # Expand the complete post text first.
                try:
                    await article.scroll_into_view_if_needed(
                        timeout=5000
                    )
                    await page.wait_for_timeout(500)
                except Exception:
                    pass

                await self.expand_see_more(article)

                post_text = await self.extract_post_text(article)

                if self.has_collapsed_marker(post_text):
                    await self.expand_see_more(article)
                    post_text = await self.extract_post_text(article)

                if not post_text:
                    self.logger.info(
                        "Article %d skipped: no post text",
                        index,
                    )
                    continue

                timestamp, timestamp_text = (
                    await self.extract_timestamp(article)
                )

                if timestamp is None:
                    self.logger.info(
                        "Article %d skipped: timestamp not found",
                        index,
                    )
                    continue

                post_date = timestamp.astimezone(
                    MANILA_TZ
                ).date()

                self.logger.info(
                    "Article %d timestamp: %s -> %s",
                    index,
                    timestamp_text,
                    post_date,
                )

                # Keep only posts from today in the Philippines.
                if post_date != today:
                    self.logger.info(
                        "Article %d skipped: not today",
                        index,
                    )
                    continue

                post_url = await self.extract_post_url(
                    article,
                    response.url,
                )

                # Prevent the same post from being exported twice.
                if post_url:
                    normalized_url = self.normalize_post_url(
                        post_url
                    )

                    if normalized_url in yielded_urls:
                        continue

                    yielded_urls.add(normalized_url)
                    post_url = normalized_url

                if (
                    self.has_collapsed_marker(post_text)
                    and post_url
                ):
                    full_post_text = (
                        await self.extract_permalink_post_text(
                            page.context,
                            post_url,
                        )
                    )

                    if full_post_text:
                        post_text = full_post_text

                if self.has_collapsed_marker(post_text):
                    self.logger.warning(
                        "Post text is still collapsed for %s",
                        post_url or response.url,
                    )
                    post_text = self.remove_collapsed_marker(
                        post_text
                    )

                if not self.is_relevant_post(
                    response.url,
                    post_text,
                ):
                    self.logger.info(
                        "Article %d skipped: not a matching outage/disconnection post",
                        index,
                    )
                    continue

                image_urls = await self.extract_images(article)

                matched_count += 1

                yield {
                    "source_page": response.url,
                    "title": self.make_title(post_text),
                    "post_text": post_text,
                    "posted": timestamp_text,
                    "posted_at": self.format_directus_datetime(
                        timestamp
                    ),
                    "post_date": post_date.isoformat(),
                    "has_image": bool(image_urls),
                    "image_urls": image_urls,
                    "post_url": post_url,
                }

            self.logger.info(
                "Exported %d today's posts from %s",
                matched_count,
                response.url,
            )

        finally:
            await page.close()

    async def expand_see_more(self, article):
        selectors = [
            'text=/^See more$/',
            'text=/^See More$/',
            'div[role="button"]:has-text("See more")',
            'span[role="button"]:has-text("See more")',
            'div[role="button"]:has-text("See More")',
            'span[role="button"]:has-text("See More")',
            'span:has-text("See more")',
        ]

        for _ in range(3):
            clicked = False

            for selector in selectors:
                buttons = article.locator(selector)
                count = await buttons.count()

                for index in range(count):
                    button = buttons.nth(index)

                    try:
                        if not await button.is_visible():
                            continue

                        await button.scroll_into_view_if_needed(
                            timeout=1500
                        )
                        await button.click(
                            timeout=2500,
                            force=True,
                        )
                        await article.page.wait_for_timeout(
                            900
                        )
                        clicked = True
                    except Exception:
                        try:
                            await button.evaluate(
                                "element => element.click()"
                            )
                            await article.page.wait_for_timeout(
                                900
                            )
                            clicked = True
                        except Exception:
                            # It may disappear after another selector
                            # clicks the same button.
                            continue

            if not clicked:
                break

    async def extract_post_text(self, article):
        selectors = [
            'div[data-ad-preview="message"]',
            'div[data-ad-comet-preview="message"]',
        ]

        for selector in selectors:
            messages = article.locator(selector)
            count = await messages.count()

            for index in range(count):
                try:
                    text = await messages.nth(
                        index
                    ).inner_text()

                    text = self.clean_text(text)

                    if text:
                        return text

                except Exception:
                    continue

        return None

    async def extract_permalink_post_text(
        self,
        context,
        post_url,
    ):
        post_page = await context.new_page()

        try:
            await post_page.goto(
                post_url,
                wait_until="domcontentloaded",
                timeout=60000,
            )
            await post_page.wait_for_timeout(5000)

            articles = post_page.locator('div[role="article"]')
            count = await articles.count()

            for index in range(count):
                article = articles.nth(index)

                try:
                    await article.scroll_into_view_if_needed(
                        timeout=5000
                    )
                except Exception:
                    pass

                await self.expand_see_more(article)
                post_text = await self.extract_post_text(article)

                if post_text:
                    return post_text

        except Exception as exc:
            self.logger.warning(
                "Could not load permalink text for %s: %s",
                post_url,
                exc,
            )
        finally:
            await post_page.close()

        return None

    async def extract_timestamp(self, article):
        """
        Return:
            (datetime in Manila timezone, visible timestamp text)
        """

        # Method 1: old Facebook data-utime attribute.
        abbr = article.locator(
            "abbr[data-utime]"
        ).first

        try:
            unix_time = await abbr.get_attribute(
                "data-utime"
            )

            if unix_time:
                parsed = datetime.fromtimestamp(
                    int(unix_time),
                    tz=MANILA_TZ,
                )

                return parsed, unix_time
        except Exception:
            pass

        # Method 2: standard HTML time element.
        time_element = article.locator(
            "time[datetime]"
        ).first

        try:
            datetime_value = (
                await time_element.get_attribute(
                    "datetime"
                )
            )

            if datetime_value:
                parsed = datetime.fromisoformat(
                    datetime_value.replace(
                        "Z",
                        "+00:00",
                    )
                )

                if parsed.tzinfo is None:
                    parsed = parsed.replace(
                        tzinfo=MANILA_TZ
                    )

                return (
                    parsed.astimezone(MANILA_TZ),
                    datetime_value,
                )
        except Exception:
            pass

        # Method 3: aria-label or title attribute.
        date_links = article.locator(
            'a[aria-label], '
            'a[title]'
        )

        link_count = await date_links.count()

        for index in range(link_count):
            link = date_links.nth(index)

            try:
                values = [
                    await link.get_attribute(
                        "aria-label"
                    ),
                    await link.get_attribute(
                        "title"
                    ),
                ]

                for value in values:
                    parsed = self.parse_facebook_date(
                        value
                    )

                    if parsed:
                        return parsed, value.strip()

            except Exception:
                continue

        # Method 4: visible timestamps inside links.
        selectors = [
            'a[href*="/posts/"] span',
            'a[href*="story_fbid"] span',
            'a[href*="permalink.php"] span',
            'a[href*="/photos/"] span',
            'a[href*="/videos/"] span',
            'a[href*="/reel/"] span',
            "abbr",
        ]

        for selector in selectors:
            elements = article.locator(selector)
            count = await elements.count()

            for index in range(count):
                try:
                    value = (
                        await elements.nth(
                            index
                        ).inner_text()
                    ).strip()

                    parsed = self.parse_facebook_date(
                        value
                    )

                    if parsed:
                        return parsed, value

                except Exception:
                    continue

        # Method 5: inspect short visible text in article.
        try:
            texts = await article.locator(
                "span"
            ).all_inner_texts()

            for value in texts:
                value = value.strip()

                # Ignore large post text and unrelated labels.
                if not value or len(value) > 80:
                    continue

                parsed = self.parse_facebook_date(
                    value
                )

                if parsed:
                    return parsed, value

        except Exception:
            pass

        return None, None

    def parse_facebook_date(self, value):
        if not value:
            return None

        value = " ".join(value.split()).strip()
        lower_value = value.lower()
        now = datetime.now(MANILA_TZ)

        if lower_value in {
            "now",
            "just now",
        }:
            return now

        # Facebook examples:
        # 5m, 5 m, 12min, 12 mins
        minute_match = re.fullmatch(
            r"(\d+)\s*"
            r"(m|min|mins|minute|minutes)",
            lower_value,
        )

        if minute_match:
            minutes = int(minute_match.group(1))

            return now - timedelta(
                minutes=minutes
            )

        # Facebook examples:
        # 1h, 2 h, 3hr, 4 hours
        hour_match = re.fullmatch(
            r"(\d+)\s*"
            r"(h|hr|hrs|hour|hours)",
            lower_value,
        )

        if hour_match:
            hours = int(hour_match.group(1))

            return now - timedelta(
                hours=hours
            )

        # Seconds, sometimes shown as 30s.
        second_match = re.fullmatch(
            r"(\d+)\s*"
            r"(s|sec|secs|second|seconds)",
            lower_value,
        )

        if second_match:
            seconds = int(second_match.group(1))

            return now - timedelta(
                seconds=seconds
            )

        # Today at 3:15 PM
        today_match = re.fullmatch(
            r"today\s+at\s+"
            r"(\d{1,2}:\d{2}\s*[ap]m)",
            lower_value,
            re.IGNORECASE,
        )

        if today_match:
            try:
                parsed_time = datetime.strptime(
                    today_match.group(1).upper(),
                    "%I:%M %p",
                )

                return now.replace(
                    hour=parsed_time.hour,
                    minute=parsed_time.minute,
                    second=0,
                    microsecond=0,
                )
            except ValueError:
                pass

        # Plain "Today".
        if lower_value == "today":
            return now

        formats = [
            "%B %d at %I:%M %p",
            "%B %d, %Y at %I:%M %p",
            "%b %d at %I:%M %p",
            "%b %d, %Y at %I:%M %p",
            "%m/%d/%Y %I:%M %p",
            "%m/%d/%Y at %I:%M %p",
            "%B %d",
            "%B %d, %Y",
            "%b %d",
            "%b %d, %Y",
        ]

        for date_format in formats:
            try:
                parsed = datetime.strptime(
                    value,
                    date_format,
                )

                if "%Y" not in date_format:
                    parsed = parsed.replace(
                        year=now.year
                    )

                return parsed.replace(
                    tzinfo=MANILA_TZ
                )

            except ValueError:
                continue

        return None

    async def extract_post_url(
        self,
        article,
        base_url,
    ):
        selectors = [
            'a[href*="/posts/"]',
            'a[href*="story_fbid"]',
            'a[href*="permalink.php"]',
            'a[href*="/photos/"]',
            'a[href*="/videos/"]',
            'a[href*="/reel/"]',
        ]

        for selector in selectors:
            links = article.locator(selector)
            count = await links.count()

            for index in range(count):
                try:
                    href = await links.nth(
                        index
                    ).get_attribute("href")

                    if not href:
                        continue

                    return urljoin(
                        base_url,
                        href,
                    )

                except Exception:
                    continue

        return None

    def normalize_post_url(self, url):
        if not url:
            return None

        # Query parameters identify story_fbid posts.
        if (
            "story_fbid=" in url
            or "permalink.php" in url
        ):
            return url.split("#")[0]

        return url.split("?")[0].split("#")[0]

    async def extract_images(self, article):
        images = article.locator("img")
        count = await images.count()

        image_urls = []

        for index in range(count):
            image = images.nth(index)

            try:
                src = await image.get_attribute("src")
                alt = await image.get_attribute("alt")

                if not src:
                    continue

                if "scontent" not in src:
                    continue

                if (
                    alt
                    and "profile picture"
                    in alt.lower()
                ):
                    continue

                width = await image.evaluate(
                    """
                    element =>
                        element.naturalWidth
                        || element.width
                    """
                )

                height = await image.evaluate(
                    """
                    element =>
                        element.naturalHeight
                        || element.height
                    """
                )

                # Remove profile pictures, icons,
                # reaction images, and thumbnails.
                if width and height:
                    if width < 250 or height < 150:
                        continue

                if src not in image_urls:
                    image_urls.append(src)

            except Exception:
                continue

        return image_urls

    def clean_text(self, text):
        lines = []
        previous_line = None

        ignored_values = {
            "see more",
            "see less",
            "like",
            "comment",
            "share",
            "send",
            "follow",
        }

        for line in text.splitlines():
            line = " ".join(line.split()).strip()
            line = self.remove_expansion_marker(line)

            if not line:
                continue

            if line.lower() in ignored_values:
                continue

            # Remove immediately repeated lines.
            if line == previous_line:
                continue

            lines.append(line)
            previous_line = line

        return "\n".join(lines).strip()

    def has_collapsed_marker(self, text):
        if not text:
            return False

        return bool(
            re.search(
                r"(\.\.\.|…)\s*see\s+more$|\bsee\s+more$",
                text.strip(),
                re.IGNORECASE,
            )
        )

    def remove_collapsed_marker(self, text):
        return self.remove_expansion_marker(text)

    def remove_expansion_marker(self, text):
        return re.sub(
            r"\s*(\.\.\.|…)?\s*see\s+(more|less)\s*$",
            "",
            text,
            flags=re.IGNORECASE,
        ).strip()

    def format_directus_datetime(self, value):
        return value.astimezone(MANILA_TZ).strftime(
            "%Y-%m-%d %H:%M:%S"
        )

    def is_relevant_post(self, source_url, post_text):
        if not post_text:
            return False

        text = post_text.lower()

        outage_terms = [
            "disconnection",
            "disconnect",
            "power outage",
            "outage",
            "brownout",
            "blackout",
            "power interruption",
            "service interruption",
            "scheduled interruption",
            "unscheduled interruption",
            "emergency interruption",
            "emergency power interruption",
            "power service interruption",
            "interrupted power",
            "power supply interruption",
            "no power",
        ]

        if not any(term in text for term in outage_terms):
            return False

        if "facebook.com/ngcpph" in source_url.lower():
            return (
                "visayas" in text
                or "nepc" in text
            )

        return True

    def make_title(self, post_text):
        # Facebook posts do not have a separate title.
        # Use the first non-empty line.
        lines = [
            line.strip()
            for line in post_text.splitlines()
            if line.strip()
        ]

        if not lines:
            return None

        first_line = lines[0]

        if len(first_line) <= 150:
            return first_line

        return (
            first_line[:147].rstrip()
            + "..."
        )

    async def errback(self, failure):
        page = failure.request.meta.get(
            "playwright_page"
        )

        self.logger.error(
            "Request failed for %s: %s",
            failure.request.url,
            failure.getErrorMessage(),
        )

        if page:
            await page.close()
