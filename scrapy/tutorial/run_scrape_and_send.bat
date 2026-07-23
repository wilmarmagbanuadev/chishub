@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "PROJECT_ROOT=%SCRIPT_DIR%.."
set "POSTS_FILE=%SCRIPT_DIR%posts.json"
set "SPIDER_FILE=%SCRIPT_DIR%spiders\quotes_spider.py"
set "SENDER_FILE=%SCRIPT_DIR%send_to_n8n.py"
set "BAT_LOG=%SCRIPT_DIR%scheduler_bat.log"
set "SCRAPY_LOG=%SCRIPT_DIR%scrapy.log"
set "N8N_LOG=%SCRIPT_DIR%n8n.log"

echo [%date% %time%] Starting BAT launcher>> "%BAT_LOG%"
echo [%date% %time%] Script dir: %SCRIPT_DIR%>> "%BAT_LOG%"

cd /d "%PROJECT_ROOT%"
echo [%date% %time%] Working dir: %CD%>> "%BAT_LOG%"

set "PYTHON_EXE="
set "SCRAPY_EXE="

if exist "%LocalAppData%\Programs\Python\Python313\Scripts\scrapy.exe" (
    set "SCRAPY_EXE=%LocalAppData%\Programs\Python\Python313\Scripts\scrapy.exe"
)

if "%SCRAPY_EXE%"=="" (
    for /f "delims=" %%P in ('where scrapy 2^>nul') do (
        if "%SCRAPY_EXE%"=="" set "SCRAPY_EXE=%%P"
    )
)

if not "%SCRAPY_EXE%"=="" (
    for %%S in ("%SCRAPY_EXE%") do (
        if exist "%%~dpS..\python.exe" (
            set "PYTHON_EXE=%%~dpS..\python.exe"
        )
    )
)

if "%PYTHON_EXE%"=="" (
    if exist "%LocalAppData%\Programs\Python\Python313\python.exe" (
        set "PYTHON_EXE=%LocalAppData%\Programs\Python\Python313\python.exe"
    )
)

if "%PYTHON_EXE%"=="" (
    for /f "delims=" %%P in ('where python 2^>nul') do (
        if "%PYTHON_EXE%"=="" set "PYTHON_EXE=%%P"
    )
)

if "%PYTHON_EXE%"=="" (
    echo [%date% %time%] ERROR: Python was not found for this user.>> "%BAT_LOG%"
    exit /b 1
)

if "%SCRAPY_EXE%"=="" (
    echo [%date% %time%] ERROR: scrapy.exe was not found for this user.>> "%BAT_LOG%"
    echo Install Scrapy with: "%PYTHON_EXE%" -m pip install scrapy scrapy-playwright>> "%BAT_LOG%"
    exit /b 1
)

echo [%date% %time%] Python: %PYTHON_EXE%>> "%BAT_LOG%"
echo [%date% %time%] Scrapy: %SCRAPY_EXE%>> "%BAT_LOG%"
echo [%date% %time%] Running Scrapy...>> "%BAT_LOG%"

"%SCRAPY_EXE%" runspider "%SPIDER_FILE%" -O "%POSTS_FILE%" > "%SCRAPY_LOG%" 2>&1

set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" (
    echo [%date% %time%] Scrapy failed with exit code %EXIT_CODE%. See scrapy.log>> "%BAT_LOG%"
    exit /b %EXIT_CODE%
)

echo [%date% %time%] Scrapy finished>> "%BAT_LOG%"
echo [%date% %time%] Running n8n sender...>> "%BAT_LOG%"

"%PYTHON_EXE%" "%SENDER_FILE%" > "%N8N_LOG%" 2>&1

set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" (
    echo [%date% %time%] n8n sender failed with exit code %EXIT_CODE%. See n8n.log>> "%BAT_LOG%"
    exit /b %EXIT_CODE%
)

echo [%date% %time%] n8n sender finished>> "%BAT_LOG%"
echo [%date% %time%] BAT launcher finished>> "%BAT_LOG%"
exit /b 0
