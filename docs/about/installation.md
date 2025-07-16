# Installation Guide

> Complete installation instructions for Form Service

## System Requirements

### Minimum Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher (or **yarn** 1.22.0 or higher)
- **RAM**: 2GB minimum, 4GB recommended
- **Disk Space**: 1GB minimum
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)

### Database Requirements
- **PostgreSQL**: 12.0 or higher (recommended)
- **MySQL**: 8.0 or higher
- **SQLite**: 3.0 or higher (development only)

### Optional Dependencies
- **Redis**: 6.0 or higher (for caching)
- **Docker**: 20.10 or higher (for containerized deployment)
- **PM2**: For production process management

## Installation Methods

### Method 1: Direct Installation

#### Step 1: Clone Repository
```bash
# Clone the repository
git clone https://github.com/your-org/form-service.git
cd form-service

# Checkout the latest release (optional)
git checkout v1.0.0
```

#### Step 2: Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Install global dependencies (optional)
npm install -g pm2 typescript ts-node
```

#### Step 3: Environment Configuration
```bash
# Copy configuration files
cp config.local.json.example config.local.json
cp .env.example .env

# Edit configuration files
nano config.local.json
nano .env
```

#### Step 4: Database Setup
```bash
# PostgreSQL setup
sudo -u postgres createdb form_service
sudo -u postgres psql -c "CREATE USER form_user WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE form_service TO form_user;"

# MySQL setup
mysql -u root -p
CREATE DATABASE form_service;
CREATE USER 'form_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON form_service.* TO 'form_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Step 5: Run Migrations
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed database (optional)
npm run seed
```

#### Step 6: Start the Service
```bash
# Development mode
npm run dev

# Production mode
npm start

# Using PM2 (recommended for production)
pm2 start dist/index.js --name "form-service"
pm2 save
pm2 startup
```

### Method 2: Docker Installation

#### Step 1: Clone Repository
```bash
git clone https://github.com/your-org/form-service.git
cd form-service
```

#### Step 2: Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
```

#### Step 3: Docker Compose Setup
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f form-service

# Stop services
docker-compose down
```

#### Docker Compose Configuration
```yaml
version: '3.8'
services:
  form-service:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=form_service
      - DB_USER=postgres
      - DB_PASSWORD=password
    depends_on:
      - postgres
      - redis
    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads

  postgres:
    image: postgres:14
    environment:
      - POSTGRES_DB=form_service
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Configuration

### Environment Variables

#### Required Variables
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=form_service
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
```

#### Optional Variables
```bash
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# File Storage
STORAGE_PROVIDER=local
STORAGE_PATH=./uploads

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

## Verification

### Health Check
```bash
# Test the service
curl http://localhost:3000/api/health

# Expected response
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

### API Test
```bash
# Test form templates endpoint
curl http://localhost:3000/api/forms/templates

# Expected response
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

### Documentation Access
```bash
# Access documentation
curl http://localhost:3000/api/docs

# Should return the docsify documentation
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check database status
sudo systemctl status postgresql

# Check connection
psql -h localhost -U form_user -d form_service

# Verify environment variables
echo $DB_HOST $DB_PORT $DB_NAME
```

#### 2. Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in configuration
```

#### 3. Permission Denied
```bash
# Fix file permissions
chmod +x entrypoint.sh
chmod -R 755 uploads/
chmod -R 755 logs/
```

#### 4. Node.js Version Issues
```bash
# Check Node.js version
node --version

# Use nvm to install correct version
nvm install 18
nvm use 18
```

### Log Files
```bash
# Application logs
tail -f logs/app.log

# PM2 logs
pm2 logs form-service

# Docker logs
docker-compose logs -f form-service
```

## Security Considerations

### Production Security
1. **Change Default Passwords**: Update all default passwords
2. **Use HTTPS**: Configure SSL/TLS certificates
3. **Firewall Configuration**: Restrict access to necessary ports
4. **Regular Updates**: Keep dependencies updated
5. **Backup Strategy**: Implement regular database backups
6. **Monitoring**: Set up monitoring and alerting

### Environment Security
```bash
# Secure environment variables
export NODE_ENV=production
export JWT_SECRET=$(openssl rand -hex 32)
export DB_PASSWORD=$(openssl rand -base64 32)

# Use .env file for sensitive data
echo "JWT_SECRET=$JWT_SECRET" >> .env
echo "DB_PASSWORD=$DB_PASSWORD" >> .env
```

## Next Steps

After successful installation:

1. **Configure Authentication**: Set up user authentication
2. **Create First Form**: Follow the [Quick Start Guide](quickstart.md)
3. **Set Up Monitoring**: Configure logging and monitoring
4. **Test API**: Use the [Bruno Collection](/) for API testing
5. **Deploy to Production**: Follow production deployment guidelines

For additional help:
- 📖 [Documentation](/) - Complete guide
- 🐛 [GitHub Issues](https://github.com/your-org/form-service/issues) - Report problems
- 💬 [Discussions](https://github.com/your-org/form-service/discussions) - Ask questions 