# Base image with Python and Node.js
FROM nikolaik/python-nodejs:python3.10-nodejs20

# Set working directory
WORKDIR /app

# Copy Python requirements
COPY requirements.txt ./
COPY setup.py ./

# Install Python dependencies
RUN pip install -e .
RUN pip install -r requirements.txt

# Copy JavaScript/TypeScript dependencies
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Expose ports for FastAPI (8000) and Next.js (3000)
EXPOSE 8000 3000

# Create a script to run both services
RUN echo '#!/bin/bash\n\
uvicorn api:app --host 0.0.0.0 --port 8000 &\n\
npm run start\n' > /app/start.sh && chmod +x /app/start.sh

# Command to run the application
CMD ["/app/start.sh"] 