@echo off
title Publicar felicitats-julia en Vercel
cd /d "%~dp0"
where npx >nul 2>nul || (echo No se encuentra Node.js/npx en este PC. & pause & exit /b 1)
echo === Vinculando proyecto felicitats-julia ===
call npx --yes vercel@latest link --yes --project felicitats-julia
if errorlevel 1 (echo ERROR al vincular & pause & exit /b 1)
echo === Desplegando a produccion ===
call npx --yes vercel@latest deploy --prod --yes > "%~dp0deploy-url.txt"
if errorlevel 1 (echo ERROR en el despliegue & type "%~dp0deploy-url.txt" & pause & exit /b 1)
echo.
echo PUBLICADO:
type "%~dp0deploy-url.txt"
echo.
pause
