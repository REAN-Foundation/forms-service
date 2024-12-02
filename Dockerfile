FROM node:18.20.3-alpine3.19

EXPOSE 5555

WORKDIR /app

RUN apk update
RUN apk upgrade

COPY package*.json ./
RUN npm install -g typescript
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm install pm2 -g

CMD ["sh", "-c", "npx prisma migrate deploy"]

# CMD ["pm2", "start", "dist/index.js"]

# RUN dos2unix /app/entrypoint.sh
# RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]