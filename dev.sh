#!/bin/bash

# First check if the database is running via the shell script
if ! docker ps | grep -q "${COMPOSE_PROJECT_NAME:-shopfloorio}"; then
  echo "Please start the main environment first with './shell' to ensure the database is running"
  exit 1
fi

# Make sure to use COMPOSE_PROJECT_NAME for network naming
export COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-shopfloorio}"

# Function to cleanup containers on exit
cleanup() {
  echo "Stopping development containers..."
  docker compose -f docker-compose.dev.yml down
  exit 0
}

# Setup cleanup on script exit
trap cleanup INT TERM EXIT

# Export environment variables for database connection
# Use the fully qualified container name to ensure we can connect to the db
CONTAINER_PREFIX="${COMPOSE_PROJECT_NAME}"
export DATABASE_HOST="${CONTAINER_PREFIX}-db-1" # The full container name of the DB
export DATABASE_PORT="3306"
export DATABASE_USERNAME="app" # Adjust as needed based on your setup
export DATABASE_PASSWORD="app" # Adjust as needed based on your setup
export DATABASE_NAME="app" # Adjust as needed based on your setup

# Print connection details for debugging
echo "Connecting to database at ${DATABASE_HOST}:${DATABASE_PORT}"

# Start the development environment
echo "Starting frontend and backend development environment..."
docker compose -f docker-compose.dev.yml up --build

# Keep the script running to ensure cleanup trap works
wait 