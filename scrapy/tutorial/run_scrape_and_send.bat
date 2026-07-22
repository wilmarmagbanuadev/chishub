@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "PS1=%SCRIPT_DIR%run_scrape_and_send.ps1"
set "BAT_LOG=%SCRIPT_DIR%scheduler_bat.log"

echo [%date% %time%] Starting BAT launcher>> "%BAT_LOG%"

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%PS1%"

set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" (
    echo [%date% %time%] PowerShell runner failed with exit code %EXIT_CODE%>> "%BAT_LOG%"
    exit /b %EXIT_CODE%
)

echo [%date% %time%] BAT launcher finished>> "%BAT_LOG%"
exit /b 0
