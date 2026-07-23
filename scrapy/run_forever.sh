#!/usr/bin/env bash
set -u

INTERVAL="${SCRAPE_INTERVAL_SECONDS:-300}"
POSTS_FILE="/app/tutorial/posts.json"
SPIDER_FILE="/app/tutorial/spiders/quotes_spider.py"
SENDER_FILE="/app/tutorial/send_to_n8n.py"

echo "Starting scraper loop. Interval: ${INTERVAL}s"

while true; do
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Running scrape..."

    if scrapy runspider "$SPIDER_FILE" -O "$POSTS_FILE"; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Scrape finished. Sending to n8n..."

        if python "$SENDER_FILE"; then
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] n8n step finished."
        else
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] n8n step failed." >&2
        fi
    else
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Scrape failed." >&2
    fi

    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Sleeping ${INTERVAL}s..."
    sleep "$INTERVAL"
done
