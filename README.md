Creating a Dockerfile to containerize the Strapi application.

Launch instance with t2.medium for better performance and access with terminal.

install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"

source ~/.bashrc

nvm --version

nvm install 18

nvm use 18

node -v

npm -v

download strapi
npx create-strapi-app@latest strapi-project --quickstart

cd strapi-project

install docker and create a dockerfile
yum install docker -y && systemctl start docker

docker -v

vim Dockerfile

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1337

CMD ["npm", "run", "develop"]

docker build -t strapi-image .

docker images

docker run -itd --name strapi-cont -p 1337:1337 strapi-image

docker ps

access with instance public ip + 1337 (strapi default port).
sign up with required credentials

create a content on Content-Type Builder and save it will restart automatically.

go to content manager and create a introduction then save and publish you can see it on home page.

This is the final deployment for strapi application using docker.

push the code to github repo and create a pull request
yum install git -y

git init

git add .

git commit -m "Initial commit - Strapi project"

git remote add origin https://github.com/sairamreddy9666/strapi-demo.git

git checkout -b sairam

git push -u origin sairam
