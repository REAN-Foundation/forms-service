@echo off
echo.
echo 📚 Starting Form Service Documentation Server...
echo.
echo This will start a local web server to serve the documentation.
echo.
echo Press any key to continue...
pause >nul

echo.
echo 🚀 Starting server...
node serve-docs.js

echo.
echo Server stopped.
pause 