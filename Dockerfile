FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy Python requirements
COPY requirements.txt ./
COPY setup.py ./
COPY knapsack ./knapsack/

# Install Python dependencies
RUN pip install -e .
RUN pip install -r requirements.txt

# Copy the API and solver files
COPY api.py ./
COPY knapsack/solver ./knapsack/solver/

# Expose port for FastAPI
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"] 