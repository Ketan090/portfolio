@echo off
setlocal
set "TARGET=%~1"
if "%TARGET%"=="" set "TARGET=%~dp0"
cd /d "%TARGET%"
echo pushing: %CD%
if not exist ".git" (
  echo no .git — init...
  git init -b main
  set /p REPO="GitHub repo URL (e.g. https://github.com/YOU/repo): "
  if defined REPO git remote add origin %REPO%
)
git add -A
set /p MSG="Commit message: "
if "%MSG%"=="" set MSG=update
git commit -m "%MSG%" 2>nul
if errorlevel 1 echo nothing new to commit
git branch -M main 2>nul
git push -u origin main
if errorlevel 1 echo push failed — check: git remote -v
pause
