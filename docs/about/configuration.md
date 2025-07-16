# Configuration Guide

> Complete configuration guide for Form Service

## Overview

Form Service uses a flexible configuration system that supports multiple environments and configuration sources. The configuration is loaded from JSON files and environment variables, with environment variables taking precedence.

## Configuration Sources

### 1. Configuration Files

The service loads configuration from two main files:

- **`config.json`** - Default configuration (version controlled)
- **`config.local.json`** - Local overrides (not version controlled)

### 2. Environment Variables

Environment variables override file-based configuration and are used for sensitive data like passwords and secrets.

## Configuration Structure

### System Configuration

```json
{
  "SystemIdentifier": "Form Service",
  "Auth": {
    "Authentication": "Custom",
    "Authorization": "Custom",
    "UseRefreshToken": true,
    "AccessTokenExpiresInSeconds": 2592000,
    "RefreshTokenExpiresInSeconds": 2592000
  },
  "Database": {
    "Type": "SQL",
    "ORM": "TypeORM"
  },
  "FileStorage": {
    "Provider": "Custom"
  },
  "Communication": {
    "Email": {
      "Provider": "Mock"
    }
  },
  "TemporaryFolders": {
    "Upload": "./tmp/resources/uploads/",
    "Download": "./tmp/resources/downloads/",
    "CleanupFolderBeforeMinutes": 10
  }
}
```

### Environment Variables

#### Database Configuration
```bash
# Database Type and ORM
DB_TYPE=postgres
DB_ORM=typeorm

# Database Connection
DB_HOST=localhost
DB_PORT=5432
DB_NAME=form_service
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_DIALECT=postgres

# Database Pool Settings
DB_POOL_MIN=5
DB_POOL_MAX=20
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

#### Server Configuration
```bash
# Server Settings
PORT=3000
HOST=localhost
NODE_ENV=development

# CORS Settings
CORS_ORIGIN=http://localhost:3000
CORS_METHODS=GET,POST,PUT,DELETE,PATCH
CORS_ALLOWED_HEADERS=Content-Type,Authorization

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false
```

#### Authentication Configuration
```bash
# JWT Settings
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Session Settings
SESSION_SECRET=your-session-secret
SESSION_MAX_AGE=86400000
```

#### File Storage Configuration
```bash
# Storage Provider
STORAGE_PROVIDER=local
STORAGE_PATH=./uploads

# AWS S3 (if using S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

#### Logging Configuration
```bash
# Logging Level
LOG_LEVEL=info
LOG_FILE=./logs/app.log
LOG_MAX_SIZE=10m
LOG_MAX_FILES=5

# Logging Format
LOG_FORMAT=json
LOG_COLORIZE=false
```

## Environment-Specific Configuration

### Development Environment

```json
{
  "SystemIdentifier": "Form Service - Development",
  "Database": {
    "Type": "SQL",
    "ORM": "TypeORM"
  },
  "FileStorage": {
    "Provider": "Custom"
  },
  "Communication": {
    "Email": {
      "Provider": "Mock"
    }
  },
  "Logging": {
    "Level": "debug",
    "File": "./logs/dev.log"
  }
}
```

### Production Environment

```json
{
  "SystemIdentifier": "Form Service - Production",
  "Database": {
    "Type": "SQL",
    "ORM": "TypeORM"
  },
  "FileStorage": {
    "Provider": "AWS-S3"
  },
  "Communication": {
    "Email": {
      "Provider": "SendGrid"
    }
  },
  "Logging": {
    "Level": "warn",
    "File": "./logs/prod.log"
  }
}
```

## Database Configuration

### PostgreSQL Configuration

```json
{
  "Database": {
    "Type": "SQL",
    "ORM": "TypeORM",
    "PostgreSQL": {
      "Host": "localhost",
      "Port": 5432,
      "Database": "form_service",
      "Username": "postgres",
      "Password": "password",
      "SSL": false,
      "Pool": {
        "Min": 5,
        "Max": 20,
        "Acquire": 30000,
        "Idle": 10000
      }
    }
  }
}
```

### MySQL Configuration

```json
{
  "Database": {
    "Type": "SQL",
    "ORM": "TypeORM",
    "MySQL": {
      "Host": "localhost",
      "Port": 3306,
      "Database": "form_service",
      "Username": "root",
      "Password": "password",
      "Charset": "utf8mb4",
      "Pool": {
        "Min": 5,
        "Max": 20,
        "Acquire": 30000,
        "Idle": 10000
      }
    }
  }
}
```

### SQLite Configuration

```json
{
  "Database": {
    "Type": "SQL",
    "ORM": "TypeORM",
    "SQLite": {
      "Database": "./data/form_service.db",
      "Logging": false
    }
  }
}
```

## File Storage Configuration

### Local Storage

```json
{
  "FileStorage": {
    "Provider": "Custom",
    "Local": {
      "Path": "./uploads",
      "MaxFileSize": "10MB",
      "AllowedTypes": ["image/*", "application/pdf", "text/*"]
    }
  }
}
```

### AWS S3 Storage

```json
{
  "FileStorage": {
    "Provider": "AWS-S3",
    "S3": {
      "Bucket": "your-bucket-name",
      "Region": "us-east-1",
      "ACL": "private",
      "MaxFileSize": "10MB"
    }
  }
}
```

## Authentication Configuration

### JWT Configuration

```json
{
  "Auth": {
    "Authentication": "Custom",
    "Authorization": "Custom",
    "JWT": {
      "Secret": "your-jwt-secret",
      "ExpiresIn": "24h",
      "RefreshExpiresIn": "7d",
      "Issuer": "form-service",
      "Audience": "form-service-users"
    },
    "UseRefreshToken": true,
    "AccessTokenExpiresInSeconds": 2592000,
    "RefreshTokenExpiresInSeconds": 6048000
  }
}
```

### Session Configuration

```json
{
  "Auth": {
    "Session": {
      "Secret": "your-session-secret",
      "MaxAge": 86400000,
      "Secure": false,
      "HttpOnly": true,
      "SameSite": "lax"
    }
  }
}
```

## Communication Configuration

### Email Configuration

```json
{
  "Communication": {
    "Email": {
      "Provider": "SendGrid",
      "SendGrid": {
        "ApiKey": "your-sendgrid-api-key",
        "FromEmail": "noreply@yourservice.com",
        "FromName": "Form Service"
      }
    }
  }
}
```

### SMS Configuration

```json
{
  "Communication": {
    "SMS": {
      "Provider": "Twilio",
      "Twilio": {
        "AccountSid": "your-account-sid",
        "AuthToken": "your-auth-token",
        "FromNumber": "+1234567890"
      }
    }
  }
}
```

## Security Configuration

### CORS Configuration

```json
{
  "Security": {
    "CORS": {
      "Origin": ["http://localhost:3000", "https://yourservice.com"],
      "Methods": ["GET", "POST", "PUT", "DELETE", "PATCH"],
      "AllowedHeaders": ["Content-Type", "Authorization"],
      "Credentials": true,
      "MaxAge": 86400
    }
  }
}
```

### Rate Limiting

```json
{
  "Security": {
    "RateLimit": {
      "WindowMs": 900000,
      "Max": 100,
      "SkipSuccessfulRequests": false,
      "SkipFailedRequests": false
    }
  }
}
```

## Monitoring Configuration

### Health Check

```json
{
  "Monitoring": {
    "HealthCheck": {
      "Enabled": true,
      "Path": "/health",
      "Interval": 30000,
      "Timeout": 5000
    }
  }
}
```

### Metrics

```json
{
  "Monitoring": {
    "Metrics": {
      "Enabled": true,
      "Path": "/metrics",
      "CollectDefault": true
    }
  }
}
```

## Configuration Validation

### Schema Validation

The configuration is validated against a schema to ensure all required fields are present and have correct types.

```typescript
interface ConfigurationSchema {
  SystemIdentifier: string;
  Auth: {
    Authentication: string;
    Authorization: string;
    UseRefreshToken: boolean;
    AccessTokenExpiresInSeconds: number;
    RefreshTokenExpiresInSeconds: number;
  };
  Database: {
    Type: string;
    ORM: string;
  };
  FileStorage: {
    Provider: string;
  };
  Communication: {
    Email: {
      Provider: string;
    };
  };
  TemporaryFolders: {
    Upload: string;
    Download: string;
    CleanupFolderBeforeMinutes: number;
  };
}
```

### Environment Variable Validation

```bash
# Validate required environment variables
npm run validate:env

# Check configuration
npm run validate:config
```

## Configuration Management

### Configuration Loading Order

1. **Default Configuration** (`config.json`)
2. **Environment-Specific Configuration** (`config.local.json`)
3. **Environment Variables** (override file settings)
4. **Runtime Configuration** (command line arguments)

### Configuration Reloading

```typescript
// Reload configuration at runtime
import { ConfigurationManager } from './config/configuration.manager';

ConfigurationManager.reloadConfigurations();
```

### Configuration Export

```bash
# Export current configuration
npm run config:export

# Import configuration
npm run config:import
```

## Best Practices

### Security Best Practices

1. **Never commit sensitive data** to version control
2. **Use environment variables** for secrets and passwords
3. **Rotate secrets regularly** in production
4. **Use strong passwords** and API keys
5. **Enable SSL/TLS** in production

### Configuration Best Practices

1. **Use descriptive names** for configuration keys
2. **Group related settings** logically
3. **Provide default values** for optional settings
4. **Validate configuration** at startup
5. **Document all configuration options**

### Environment Best Practices

1. **Separate configurations** by environment
2. **Use consistent naming** conventions
3. **Limit environment variables** to what's necessary
4. **Use configuration files** for complex settings
5. **Test configuration** in all environments

## Troubleshooting

### Common Configuration Issues

#### 1. Configuration Not Loading
```bash
# Check configuration file syntax
node -e "console.log(require('./config.json'))"

# Verify environment variables
env | grep DB_
```

#### 2. Database Connection Issues
```bash
# Test database connection
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME

# Check database status
sudo systemctl status postgresql
```

#### 3. File Storage Issues
```bash
# Check file permissions
ls -la uploads/

# Test file upload
curl -X POST -F "file=@test.txt" http://localhost:3000/api/upload
```

### Configuration Debugging

```bash
# Enable debug logging
LOG_LEVEL=debug npm start

# Show configuration at startup
DEBUG=config npm start
```

## Next Steps

After configuring your service:

1. **Test Configuration**: Run validation checks
2. **Start Service**: Verify all settings work correctly
3. **Monitor Logs**: Check for configuration-related errors
4. **Backup Configuration**: Store secure copies of production configs
5. **Document Changes**: Keep track of configuration modifications

For additional help:
- 📖 [Installation Guide](installation.md) - Setup instructions
- 🔧 [API Reference](api/overview.md) - API configuration
- 🛠️ [Development Guide](guides/development.md) - Development setup 