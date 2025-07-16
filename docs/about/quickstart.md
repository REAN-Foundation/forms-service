# Quick Start Guide

> Get up and running with Form Service in under 5 minutes

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher (or **yarn** 1.22.0 or higher)
- **Database**: PostgreSQL 12+, MySQL 8.0+, or SQLite 3.0+

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-org/form-service.git
cd form-service

# Install dependencies
npm install
```

## Step 2: Configuration

Copy the example configuration file and customize it:

```bash
# Copy configuration template
cp config.local.json.example config.local.json

# Edit the configuration file
nano config.local.json
```

### Basic Configuration Example

```json
{
  "database": {
    "host": "localhost",
    "port": 5432,
    "database": "form_service",
    "username": "postgres",
    "password": "your_password",
    "dialect": "postgres"
  },
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  "jwt": {
    "secret": "your-super-secret-jwt-key",
    "expiresIn": "24h"
  },
  "logging": {
    "level": "info"
  }
}
```

## Step 3: Database Setup

### Option A: PostgreSQL (Recommended)

```bash
# Create database
createdb form_service

# Run migrations (if using TypeORM)
npm run migration:run
```

### Option B: MySQL

```sql
CREATE DATABASE form_service;
```

### Option C: SQLite

```bash
# SQLite database will be created automatically
# No additional setup required
```

## Step 4: Start the Service

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

The service will be available at `http://localhost:3000`

## Step 5: Verify Installation

Test the health endpoint:

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

## Step 6: Create Your First Form

### Using the API

```bash
# Create a form template
curl -X POST http://localhost:3000/api/forms/templates \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Contact Form",
    "description": "Simple contact form",
    "sections": [
      {
        "name": "Personal Information",
        "fields": [
          {
            "name": "fullName",
            "label": "Full Name",
            "type": "text",
            "required": true
          },
          {
            "name": "email",
            "label": "Email Address",
            "type": "email",
            "required": true
          }
        ]
      }
    ]
  }'
```

### Using Bruno (API Client)

1. Open the `bruno/form-service` folder in Bruno
2. Import the collection from `Postman/form-service.postman_collection.json`
3. Set up your environment variables
4. Run the "Create a form template" request

## Step 7: Submit Form Data

```bash
# Submit form data
curl -X POST http://localhost:3000/api/forms/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "templateId": "your-template-id",
    "responses": [
      {
        "fieldName": "fullName",
        "value": "John Doe"
      },
      {
        "fieldName": "email",
        "value": "john@example.com"
      }
    ]
  }'
```

## 🎉 Congratulations!

You've successfully set up Form Service! Here's what you can do next:

### Next Steps

1. **Explore the API**: Check out the [API Documentation](api/overview.md)
2. **Learn Skip Logic**: See [Skip Logic Guide](guides/skip-logic.md)
3. **Build Complex Forms**: Follow the [Form Builder Guide](guides/form-builder.md)
4. **Add Validation**: Learn about [Validation Rules](guides/validation-rules.md)

### Common Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm test             # Run tests
npm run test:watch   # Run tests in watch mode

# Database
npm run migration:run    # Run database migrations
npm run migration:revert # Revert last migration
npm run seed            # Seed database with sample data

# Linting and Formatting
npm run lint           # Run ESLint
npm run lint:fix       # Fix linting issues
npm run format         # Format code with Prettier
```

### Troubleshooting

<div class="warning">
  <strong>Common Issues:</strong>
  
  - **Port already in use**: Change the port in `config.local.json`
  - **Database connection failed**: Check your database credentials
  - **JWT errors**: Ensure your JWT secret is properly configured
</div>

### Getting Help

- 📖 [Full Documentation](/) - Complete guide
- 🐛 [GitHub Issues](https://github.com/your-org/form-service/issues) - Report bugs
- 💬 [Discussions](https://github.com/your-org/form-service/discussions) - Ask questions
- 📧 [Email Support](mailto:support@yourservice.com) - Direct support

## 🔧 Documentation Troubleshooting

### If Documentation Shows "Loading..."

The documentation requires a web server to run properly. Here are the solutions:

#### Solution 1: Use the Form Service (Recommended)
```bash
npm run dev
# Then visit: http://localhost:3000/api/docs
```

#### Solution 2: Use Standalone Documentation Server
```bash
npm run docs
# Then visit: http://localhost:8080
```

#### Solution 3: Use Python (if available)
```bash
cd docs
python -m http.server 8080
# Then visit: http://localhost:8080
```

#### Solution 4: Use Node.js http-server
```bash
npm install -g http-server
cd docs
http-server -p 8080
# Then visit: http://localhost:8080
```

### Common Issues

1. **"Loading..." message**: You're trying to open the file directly. Use a web server instead.
2. **CORS errors**: The browser is blocking local file access. Use a web server.
3. **Missing styles**: Static files aren't being served. Use a web server.
4. **Broken links**: Relative paths don't work with file:// protocol. Use a web server.

**Remember**: Always use `http://` URLs, never `file://` URLs for the documentation.

---

<div class="info">
  <strong>Pro Tip:</strong> Use the Bruno API client included in the project for easier API testing and development.
</div> 