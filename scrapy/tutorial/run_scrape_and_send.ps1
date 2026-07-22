$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$PostsFile = Join-Path $PSScriptRoot "posts.json"
$SpiderFile = Join-Path $PSScriptRoot "spiders\quotes_spider.py"
$SenderFile = Join-Path $PSScriptRoot "send_to_n8n.py"

Set-Location $ProjectRoot

scrapy runspider $SpiderFile -O $PostsFile
python $SenderFile
