@echo off
echo ========================================
echo   KUMASHKOV MASSAGE WEBSITE
echo   Local Development Server
echo ========================================
echo.
echo Starting local server...
echo.
echo Server will run on: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
echo Opening browser in 2 seconds...
echo.

REM Wait 2 seconds
timeout /t 2 /nobreak >nul

REM Open browser
start http://localhost:8000

REM Start Python HTTP server
REM Try Python 3 first, then Python 2
python -m http.server 8000 2>nul
if errorlevel 1 python -m SimpleHTTPServer 8000
