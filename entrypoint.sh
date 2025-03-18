#!/bin/bash

# Add config/creds copying here..
aws s3 cp s3://$S3_CONFIG_BUCKET/$S3_CONFIG_PATH/env.config /app/.env


cd /app
# Add any other scripts here...
# Start the service
# npm run start
pm2-runtime dist/index.js