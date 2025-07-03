FROM node:18.20.8-alpine3.21 AS builder
COPY . /app
RUN apk add bash
RUN apk add --no-cache \
        python3 \
        py3-pip \
    # && pip3 install --upgrade pip \
    # && pip3 install \
    #     awscli \
    && rm -rf /var/cache/apk/*
RUN apk add --update alpine-sdk

WORKDIR /app
COPY package*.json /app/
RUN npm install -g typescript
RUN npm install
COPY src ./src
COPY tsconfig.json ./
RUN npx prisma generate
RUN npm run build

##
FROM node:18.20.8-alpine3.21
RUN apk add bash
RUN apk add --no-cache \
        python3 \
        py3-pip \
    # && pip3 install --upgrade pip \
    && pip3 install --break-system-packages awscli \
    && rm -rf /var/cache/apk/*
RUN apk add --update alpine-sdk
RUN apk update
RUN apk upgrade
COPY . /app
WORKDIR /app

COPY package*.json /app/
RUN npm install pm2 -g
RUN npm install
COPY --from=builder /app/dist /app/dist

RUN chmod +x /app/entrypoint.sh

EXPOSE 5555

CMD ["sh", "-c", "npx prisma migrate deploy"]

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]




# FROM node:18.20-alpine3.19

# EXPOSE 5555

# RUN apk update
# RUN apk upgrade
# RUN apk add bash
# RUN apk add --no-cache \
#     python3 \
#     py3-pip \
#     curl \
#     unzip

# # Download and install AWS CLI
# RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
#     && unzip awscliv2.zip \
#     && ./aws/install \
#     && rm -rf awscliv2.zip aws

# WORKDIR /app

# COPY package*.json ./
# RUN npm install -g typescript
# RUN npm install

# COPY . .

# RUN npx prisma generate

# RUN npm run build

# RUN npm install pm2 -g

# CMD ["sh", "-c", "npx prisma migrate deploy"]

# RUN chmod +x ./entrypoint.sh

# ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]