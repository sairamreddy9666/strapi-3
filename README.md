Strapi + Postgres + Nginx (Docker Setup)
📌 Overview

This setup runs a Strapi CMS application with a Postgres database behind an Nginx reverse proxy.

Strapi is exposed via port 80 (thanks to Nginx).

Postgres runs internally (not exposed to public internet).

⚡ Prerequisites

Docker installed (>= 20.x)

Docker Compose installed (>= 1.29)

EC2 / Linux server with inbound port 80 open in security group

📂 Project Structure
strapi/
├── docker-compose.yml
├── nginx.conf
└── README.md

🛠 Setup Instructions
1. Clone the Repo
git clone https://github.com/<your-username>/<your-repo>.git
cd strapi

2. Create Environment Variables

Create a .env file inside strapi/:

POSTGRES_USER=strapi
POSTGRES_PASSWORD=strapi123
POSTGRES_DB=strapi_db

3. Docker Compose File

docker-compose.yml:

version: "3.8"

services:
  postgres:
    image: postgres:15-alpine
    container_name: postgres-container
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  strapi:
    image: strapi/strapi:latest
    container_name: strapi-container
    restart: always
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: ${POSTGRES_DB}
      DATABASE_USERNAME: ${POSTGRES_USER}
      DATABASE_PASSWORD: ${POSTGRES_PASSWORD}
    depends_on:
      - postgres
    ports:
      - "1337:1337"

  nginx:
    image: nginx:stable-alpine
    container_name: nginx-container
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - strapi

volumes:
  postgres_data:

4. Nginx Config

nginx.conf:

events {}

http {
    server {
        listen 80;

        location / {
            proxy_pass http://strapi-container:1337;
        }
    }
}

5. Start the Services
docker compose up -d

6. Access Strapi

Open in your browser:

http://<your-ec2-public-ip>

✅ Verification

Check running containers:

docker ps


You should see:

postgres-container

strapi-container

nginx-container

🧹 Stop and Clean Up
docker compose down
docker volume rm strapi_postgres_data

🎯 Notes

Default Strapi port 1337 is proxied to 80 via Nginx.

Update your .env file for custom DB credentials.

Make sure AWS security group allows port 80 inbound traffic.
