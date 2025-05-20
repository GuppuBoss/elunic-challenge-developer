# Docker Development Setup

This repository includes Docker configuration for running both the frontend and backend applications in a development environment.

## Prerequisites

- Docker
- Docker Compose

## Development Setup Options

There are two ways to run the application:

### Option 1: Using the Existing Shell Environment

This approach leverages the existing database setup managed by the shell script.

1. Start the main environment (which includes the database):
   ```bash
   ./shell
   ```

2. In a separate terminal, start the frontend and backend services:
   ```bash
   ./dev.sh
   ```

This setup connects the frontend and backend to the existing database container.

### Option 2: Standalone Docker Compose

If you prefer to run everything in a self-contained environment, you can use the standard docker-compose file:

```bash
docker-compose up
```

If you need to rebuild the images, use:

```bash
docker-compose up --build
```

## Services

The Docker setup includes the following services:

1. **Frontend** - Angular application
   - Available at http://localhost:4200

2. **Backend** - NestJS API server
   - Available at http://localhost:3000
   - API routes are exposed at http://localhost:3000/api

3. **Database** - MySQL 8.0 (when using standalone docker-compose)
   - Port: 3306
   - Credentials:
     - Database: app
     - Username: app
     - Password: app
     - Root Password: root

## Development Workflow

The Docker setup uses volume mapping to ensure that code changes are reflected immediately:

- Source code in the host machine is mounted to the containers
- Node modules are stored in a Docker volume to prevent overriding local modules

## Running Migrations

To run database migrations inside the Docker container:

```bash
# If using the shell environment setup:
docker-compose -f docker-compose.dev.yml exec backend npm run migration:run

# If using the standalone setup:
docker-compose exec backend npm run migration:run
```

To create a new migration:

```bash
# If using the shell environment setup:
docker-compose -f docker-compose.dev.yml exec backend npm run migration:create -- src/database/migrations/YourMigrationName

# If using the standalone setup:
docker-compose exec backend npm run migration:create -- src/database/migrations/YourMigrationName
```

To generate a migration based on entity changes:

```bash
# If using the shell environment setup:
docker-compose -f docker-compose.dev.yml exec backend npm run migration:generate -- src/database/migrations/YourMigrationName

# If using the standalone setup:
docker-compose exec backend npm run migration:generate -- src/database/migrations/YourMigrationName
``` 