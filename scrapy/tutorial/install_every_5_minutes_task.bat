@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "RUNNER=%SCRIPT_DIR%run_scrape_and_send.bat"
set "TASK_NAME=ChisHub Facebook Scraper"

echo Installing scheduled task: %TASK_NAME%
echo Runner: %RUNNER%

schtasks /Create ^
    /TN "%TASK_NAME%" ^
    /TR "\"%RUNNER%\"" ^
    /SC MINUTE ^
    /MO 5 ^
    /F

if errorlevel 1 (
    echo Failed to create scheduled task. Run this BAT as Administrator.
    exit /b 1
)

echo Scheduled task installed.
echo It will run every 5 minutes.
echo.
echo To test now, run:
echo schtasks /Run /TN "%TASK_NAME%"

exit /b 0
