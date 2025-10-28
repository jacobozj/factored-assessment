FROM python:3.13-slim

WORKDIR /app

#Copy requirements
COPY requirements.txt .

#Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

#Copy application code
COPY . .

#Expose port
EXPOSE 8000

#Initialize database and run application
CMD python seed_db.py && python main.py
