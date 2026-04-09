@echo off
set PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
cd backend
python -m uvicorn main:app --reload --port 8000
pause
