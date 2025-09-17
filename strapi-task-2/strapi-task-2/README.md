# 🚀 Strapi Application Deployment with Docker

This repository demonstrates how to **containerize a Strapi application** using Docker, run it on an EC2 instance, and push the code to GitHub.

---

## 📌 Prerequisites
- AWS EC2 instance (**t2.medium** recommended for better performance)  
- GitHub account & repository  
- Basic knowledge of Linux commands  

---

## ⚙️ Setup Guide


1️⃣ Launch EC2 Instance
- Launch a **t2.medium** instance (Amazon Linux 2 recommended)  
- Connect to the instance via SSH  

```bash
ssh -i "key.pem" ec2-user@<EC2-Public-IP>

2️⃣ Install Node.js (using NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"

source ~/.bashrc

nvm --version
nvm install 18
nvm use 18

node -v
npm -v

3️⃣ Create Strapi Project
npx create-strapi-app@latest strapi-project --quickstart
cd strapi-project

4️⃣ Install & Start Docker
sudo yum install docker -y
sudo systemctl start docker
docker -v

5️⃣ Create Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 1337

CMD ["npm", "run", "develop"]

6️⃣ Build & Run Docker Container
docker build -t strapi-image .
docker images
docker run -itd --name strapi-cont -p 1337:1337 strapi-image
docker ps

7️⃣ Access Strapi

Open in browser:

http://<EC2-Public-IP>:1337

Sign up with credentials

Go to Content-Type Builder → Create a new type

Go to Content Manager → Add entries → Save & Publish

8️⃣ Push Code to GitHub
sudo yum install git -y

git init
git add .
git commit -m "Initial commit - Strapi project"

git branch -M sairam
git remote add origin https://github.com/sairamreddy9666/strapi-demo.git
git push -u origin sairam

✅ Final Outcome

Strapi is successfully containerized & running on Docker

Accessible at: http://<EC2-Public-IP>:1337

Project code pushed to GitHub repository
