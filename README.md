<img width="298" height="449" alt="image" src="https://github.com/user-attachments/assets/2ddd1bf9-1204-405d-b217-a78dc796f2b7" />



Strapi + PostgreSQL + Nginx Reverse Proxy 🚀

A fully dockerized Strapi CMS stack with PostgreSQL database and Nginx reverse proxy, deployable on AWS EC2 t2.medium.

📌 Features

✅ Strapi CMS with the latest stable image

✅ PostgreSQL 15 Alpine container

✅ Nginx reverse proxy for routing

✅ Docker Compose orchestration

✅ Environment variables via .env

✅ Persistent database using Docker volumes

📋 Table of Contents

Prerequisites

Launch EC2 Instance

Install Docker & Compose

Environment Variables

Docker Compose Services

Nginx Configuration

Run Application

Access Strapi

Project Structure

🛠 Prerequisites

AWS account

EC2 instance (Amazon Linux 2 recommended)

Security group allowing SSH (22) and HTTP (80)

🌐 Launch EC2 Instance
<details> <summary>Click to expand instructions</summary>

Launch t2.medium instance with Amazon Linux 2

Connect via SSH:

ssh -i your-key.pem ec2-user@<EC2_PUBLIC_IP>


Create project directory:

mkdir strapi-3

cd strapi-3

</details>

🐳 Install Docker & Docker Compose
<details> <summary>Click to expand commands</summary>

Install Docker:

sudo yum install docker -y

sudo systemctl start docker

sudo systemctl enable docker

sudo systemctl status docker


Install Docker Compose:

sudo yum update -y

sudo mkdir -p /usr/local/lib/docker/cli-plugins

sudo curl -SL https://github.com/docker/compose/releases/download/v2.22.0/docker-compose-linux-x86_64 \
-o /usr/local/lib/docker/cli-plugins/docker-compose

sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

docker compose version

</details>

⚙ Environment Configuration

Create .env file:

vim .env


Add variables:

POSTGRES_USER=strapi

POSTGRES_PASSWORD=strapi123

POSTGRES_DB=strapi_db

📦 Docker Compose Services

Create docker-compose.yml:

version: "3"

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
      
    networks:
    
      - strapi-network

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
      
    volumes:
    
      - ./strapi_app:/srv/app
      
    networks:
    
      - strapi-network
      
  nginx:
  
    image: nginx:stable-alpine
    
    container_name: nginx-container
    
    restart: always
    
    ports:
    
      - "80:80"
      
    volumes:
    
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      
    depends_on:
    
      - strapi
      
    networks:
    
      - strapi-network
      
volumes:

  postgres_data:
  
networks:

  strapi-network:
  
    name: strapi-network

📝 Nginx Configuration

Create nginx/nginx.conf:

mkdir -p nginx

vim nginx/nginx.conf

events {}

http {

    server {
    
        listen 80;

        location / {
        
            proxy_pass http://strapi-container:1337;
        }
        
    }
}

▶ Running the Application

Start services:

docker compose up -d


Check containers:

docker ps


You should see Postgres, Strapi, and Nginx running.

🌐 Accessing Strapi

Open your browser and visit:

http://<EC2_PUBLIC_IP>


Strapi CMS is ready to use!

🗂 Project Structure

strapi-3/

├── docker-compose.yml

├── .env

├── strapi_app/    # Strapi project data

└── nginx/

    └── nginx.conf       # Nginx reverse proxy config

💡 Tips

Change environment variables in .env for production

Use volumes to persist data across container restarts

Customize Nginx config for SSL, caching, or load balancing

✅ Your Strapi CMS stack is live with Postgres database and Nginx reverse proxy!

