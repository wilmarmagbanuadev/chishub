import json
import os
import sys
from pathlib import Path
from urllib import request
from urllib.error import HTTPError, URLError


DEFAULT_WEBHOOK_URL = (
    "https://n8n.chishub.com/webhook/"
    "cf216e36-9b3f-49af-8555-5e565f9f6b1e"
)

DEFAULT_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/126.0.0.0 Safari/537.36"
)


def load_posts(path):
    if not path.exists():
        raise FileNotFoundError(f"Posts file not found: {path}")

    with path.open(encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, list):
        raise ValueError("posts.json must contain a JSON array")

    return data


def send_posts(webhook_url, posts):
    method = os.getenv("N8N_METHOD", "POST").upper()
    payload = json.dumps(posts).encode("utf-8")

    req = request.Request(
        webhook_url,
        data=payload,
        headers={
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Content-Type": "application/json",
            "User-Agent": os.getenv(
                "N8N_USER_AGENT",
                DEFAULT_USER_AGENT,
            ),
        },
        method=method,
    )

    with request.urlopen(req, timeout=60) as response:
        return method, response.status, response.read().decode("utf-8")


def main():
    posts_path = Path(__file__).with_name("posts.json")
    webhook_url = os.getenv("N8N_WEBHOOK_URL", DEFAULT_WEBHOOK_URL)

    try:
        posts = load_posts(posts_path)
    except (FileNotFoundError, json.JSONDecodeError, ValueError) as exc:
        print(f"Cannot send posts: {exc}", file=sys.stderr)
        return 1

    if len(posts) == 0:
        print("No posts to send to n8n.")
        return 0

    method = os.getenv("N8N_METHOD", "POST").upper()
    print(f"Found {len(posts)} posts to send to n8n.")
    print(f"n8n method: {method}")
    print(f"n8n URL: {webhook_url}")
    print(
        "n8n user-agent: "
        f"{os.getenv('N8N_USER_AGENT', DEFAULT_USER_AGENT)}"
    )

    try:
        method, status, body = send_posts(webhook_url, posts)
    except HTTPError as exc:
        print(
            f"n8n returned HTTP {exc.code}: {exc.read().decode('utf-8')}",
            file=sys.stderr,
        )
        return 1
    except URLError as exc:
        print(f"Could not reach n8n: {exc.reason}", file=sys.stderr)
        return 1

    print(f"Sent {len(posts)} posts to n8n with {method}. HTTP {status}")

    if body:
        print(body)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
