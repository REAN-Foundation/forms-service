# Troubleshooting Guide

> Common issues and solutions for Form Service

## Quick Diagnosis

### Check Service Status

```bash
# Check if service is running
curl http://localhost:3000/api/health

# Expected response
{
  "success": true,
  "data": {
    "status": "ok",
    "version": "1.0.0",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### Check Logs

```bash
# View application logs
tail -f logs/app.log

# View error logs
tail -f logs/error.log

# View debug logs
tail -f logs/debug.log
```

## Common Issues

### 1. Service Won't Start

#### Issue: Port Already in Use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in configuration
PORT=3001 npm start
```

#### Issue: Database Connection Failed

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Check connection settings
echo $DB_HOST $DB_PORT $DB_NAME $DB_USER
```

#### Issue: Missing Dependencies

**Symptoms:**
```
Error: Cannot find module 'express'
```

**Solutions:**
```bash
# Install dependencies
npm install

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 2. Authentication Issues

#### Issue: Invalid JWT Token

**Symptoms:**
```
401 Unauthorized
{
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid token"
  }
}
```

**Solutions:**
```bash
# Check JWT secret configuration
echo $JWT_SECRET

# Generate new JWT secret
openssl rand -hex 32

# Update environment variable
export JWT_SECRET=your-new-secret
```

#### Issue: Token Expired

**Symptoms:**
```
401 Unauthorized
{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Access token has expired"
  }
}
```

**Solutions:**
```javascript
// Use refresh token to get new access token
const response = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    refreshToken: storedRefreshToken
  })
});
```

### 3. Database Issues

#### Issue: Migration Failed

**Symptoms:**
```
Error: Migration failed
```

**Solutions:**
```bash
# Check migration status
npx prisma migrate status

# Reset database (WARNING: This will delete all data)
npx prisma migrate reset

# Run migrations manually
npx prisma migrate deploy
```

#### Issue: Connection Pool Exhausted

**Symptoms:**
```
Error: Connection pool exhausted
```

**Solutions:**
```bash
# Increase pool size in configuration
DB_POOL_MAX=50

# Check active connections
SELECT count(*) FROM pg_stat_activity WHERE datname = 'form_service';
```

#### Issue: Slow Queries

**Symptoms:**
- API responses are slow
- Database CPU usage is high

**Solutions:**
```sql
-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Add indexes for slow queries
CREATE INDEX idx_form_submissions_template_status 
ON form_submissions(template_id, status);
```

### 4. Form Logic Issues

#### Issue: Skip Logic Not Working

**Symptoms:**
- Fields not hiding/showing as expected
- Console errors related to skip logic

**Solutions:**
```javascript
// Enable debug mode
const DEBUG_SKIP_LOGIC = true;

// Check skip logic evaluation
console.log('Form data:', formData);
console.log('Skip logic:', skipLogic);
console.log('Evaluation result:', result);
```

#### Issue: Validation Errors

**Symptoms:**
```
422 Validation Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [...]
  }
}
```

**Solutions:**
```javascript
// Check validation rules
const validationRules = field.validation;
console.log('Validation rules:', validationRules);

// Test validation manually
const isValid = validateField(value, validationRules);
console.log('Validation result:', isValid);
```

### 5. File Upload Issues

#### Issue: File Too Large

**Symptoms:**
```
413 Payload Too Large
```

**Solutions:**
```bash
# Increase file size limit
MAX_FILE_SIZE=20MB

# Check file size before upload
if (file.size > maxFileSize) {
  alert('File too large');
}
```

#### Issue: Invalid File Type

**Symptoms:**
```
400 Bad Request
{
  "error": {
    "message": "Invalid file type"
  }
}
```

**Solutions:**
```javascript
// Check allowed file types
const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
const isValidType = allowedTypes.includes(file.type);

if (!isValidType) {
  alert('Invalid file type');
}
```

### 6. Performance Issues

#### Issue: Slow API Responses

**Symptoms:**
- API requests take > 2 seconds
- High response times in logs

**Solutions:**
```bash
# Check database performance
EXPLAIN ANALYZE SELECT * FROM form_submissions WHERE template_id = 'uuid';

# Enable query logging
LOG_QUERIES=true

# Check memory usage
node --max-old-space-size=4096 dist/index.js
```

#### Issue: High Memory Usage

**Symptoms:**
- Service crashes with out of memory errors
- High memory usage in monitoring

**Solutions:**
```bash
# Increase Node.js memory limit
node --max-old-space-size=4096 dist/index.js

# Check for memory leaks
npm install -g clinic
clinic doctor -- node dist/index.js
```

### 7. CORS Issues

#### Issue: CORS Error in Browser

**Symptoms:**
```
Access to fetch at 'http://localhost:3000/api/forms' from origin 'http://localhost:3001' has been blocked by CORS policy
```

**Solutions:**
```javascript
// Update CORS configuration
const corsOptions = {
  origin: ['http://localhost:3001', 'https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
};

app.use(cors(corsOptions));
```

### 8. Rate Limiting Issues

#### Issue: Rate Limit Exceeded

**Symptoms:**
```
429 Too Many Requests
{
  "error": {
    "code": "RATE_LIMIT_ERROR",
    "message": "Rate limit exceeded"
  }
}
```

**Solutions:**
```javascript
// Implement exponential backoff
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequest = async (url, options) => {
  try {
    return await fetch(url, options);
  } catch (error) {
    if (error.status === 429) {
      await delay(1000); // Wait 1 second
      return makeRequest(url, options); // Retry
    }
    throw error;
  }
};
```

## Debug Mode

### Enable Debug Logging

```bash
# Set debug environment variables
LOG_LEVEL=debug
DEBUG=form-service:*
NODE_ENV=development

# Start service with debug logging
npm run dev
```

### Debug Configuration

```json
{
  "logging": {
    "level": "debug",
    "file": "./logs/debug.log",
    "console": true
  },
  "debug": {
    "skipLogic": true,
    "validation": true,
    "database": true,
    "api": true
  }
}
```

## Monitoring and Alerts

### Health Check Endpoint

```bash
# Check service health
curl http://localhost:3000/api/health

# Check database health
curl http://localhost:3000/api/health/database

# Check external services
curl http://localhost:3000/api/health/external
```

### Performance Monitoring

```bash
# Monitor CPU and memory usage
top -p $(pgrep -f "node.*form-service")

# Monitor disk usage
df -h

# Monitor network connections
netstat -an | grep :3000
```

### Log Monitoring

```bash
# Monitor error logs
tail -f logs/error.log | grep -i error

# Monitor access logs
tail -f logs/access.log | grep -i "POST\|PUT\|DELETE"

# Monitor slow queries
tail -f logs/database.log | grep -i "slow"
```

## Recovery Procedures

### Service Recovery

```bash
# Restart service
pm2 restart form-service

# Or restart manually
pkill -f "node.*form-service"
npm start
```

### Database Recovery

```bash
# Restore from backup
psql -h localhost -U postgres -d form_service < backup.sql

# Rebuild indexes
REINDEX DATABASE form_service;

# Vacuum database
VACUUM ANALYZE;
```

### Configuration Recovery

```bash
# Restore configuration from backup
cp config.backup.json config.json

# Validate configuration
npm run validate:config

# Restart service
npm restart
```

## Prevention

### Best Practices

1. **Regular Backups**
   ```bash
   # Automated backup script
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   pg_dump -h localhost -U postgres -d form_service > backup_$DATE.sql
   gzip backup_$DATE.sql
   ```

2. **Monitoring Setup**
   ```bash
   # Set up monitoring alerts
   # Monitor disk space, memory, CPU, and response times
   ```

3. **Log Rotation**
   ```bash
   # Configure log rotation
   logrotate /etc/logrotate.d/form-service
   ```

4. **Health Checks**
   ```bash
   # Set up health check monitoring
   # Alert on service failures
   ```

## Getting Help

### Self-Service Resources

- 📖 [Documentation](/) - Complete documentation
- 🔍 [Search](/) - Search documentation
- 💡 [Examples](examples/) - Code examples

### Support Channels

- 🐛 [GitHub Issues](https://github.com/your-org/form-service/issues) - Report bugs
- 💬 [Discussions](https://github.com/your-org/form-service/discussions) - Ask questions
- 📧 [Email Support](mailto:support@example.com) - Contact support

### When Contacting Support

Please include:

1. **Error Details**
   - Full error message
   - Stack trace
   - Log files

2. **Environment Information**
   - Operating system
   - Node.js version
   - Database version
   - Configuration files

3. **Steps to Reproduce**
   - Detailed steps
   - Sample data
   - Expected vs actual behavior

4. **Context**
   - What you were trying to do
   - When the issue started
   - Any recent changes

## Next Steps

- 🔧 [Configuration Guide](about/configuration.md) - System configuration
- 🚀 [Deployment Guide](guides/deployment.md) - Production deployment
- 📊 [Performance Tuning](guides/performance.md) - Optimization tips
- 🔒 [Security Guide](guides/security.md) - Security best practices 