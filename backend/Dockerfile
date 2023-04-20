# Use the official Python image
FROM python:3.9

# Set environment variables (if needed)
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["flask", "run"]