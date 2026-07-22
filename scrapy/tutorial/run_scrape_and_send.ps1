$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$PostsFile = Join-Path $PSScriptRoot "posts.json"
$SpiderFile = Join-Path $PSScriptRoot "spiders\quotes_spider.py"
$SenderFile = Join-Path $PSScriptRoot "send_to_n8n.py"
$LogFile = Join-Path $PSScriptRoot "scheduler.log"

function Write-Log {
    param([string]$Message)

    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $LogFile -Value "[$Timestamp] $Message"
}

try {
    Write-Log "Started"
    Write-Log "User: $([System.Security.Principal.WindowsIdentity]::GetCurrent().Name)"
    Write-Log "Script folder: $PSScriptRoot"

    Set-Location $ProjectRoot
    Write-Log "Working directory: $(Get-Location)"

    $PythonCommand = Get-Command python -ErrorAction SilentlyContinue

    if (-not $PythonCommand) {
        throw "Python was not found in PATH for the scheduled task user."
    }

    Write-Log "Python: $($PythonCommand.Source)"

    & $PythonCommand.Source -m scrapy runspider $SpiderFile -O $PostsFile *> "$PSScriptRoot\scrapy.log"

    if ($LASTEXITCODE -ne 0) {
        throw "Scrapy failed with exit code $LASTEXITCODE. See scrapy.log."
    }

    Write-Log "Scrapy finished"

    & $PythonCommand.Source $SenderFile *> "$PSScriptRoot\n8n.log"

    if ($LASTEXITCODE -ne 0) {
        throw "n8n sender failed with exit code $LASTEXITCODE. See n8n.log."
    }

    Write-Log "n8n sender finished"
    Write-Log "Done"
}
catch {
    Write-Log "ERROR: $($_.Exception.Message)"
    exit 1
}
