FROM python:3.11-slim

WORKDIR /app
ENV PYTHONPATH=/app


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire src tree so package imports work and subfolders are preserved
COPY src/ ./

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]