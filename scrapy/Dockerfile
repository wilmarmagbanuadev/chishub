FROM mcr.microsoft.com/playwright/python:v1.61.0-noble

ENV PYTHONUNBUFFERED=1
ENV TZ=Asia/Manila
ENV SCRAPE_INTERVAL_SECONDS=300

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY tutorial ./tutorial
COPY run_forever.sh ./run_forever.sh

RUN sed -i 's/\r$//' ./run_forever.sh \
    && chmod +x ./run_forever.sh

CMD ["./run_forever.sh"]
