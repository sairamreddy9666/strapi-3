Strapi on AWS with Terraform — Step-by-Step README

step-1: I created an EC2 instance with t2.micro and attached IAM role (ec2fullaccess).

step-2: install git (yum install git -y) to check git version (git -v)

step-3: install terraform (https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) to check terraform version (terraform version)

step-4: git clone https://github.com/sairamreddy9666/Strapi-Repo.git

step-5: to install tree (yum install tree -y) and enter tree.

<img width="279" height="135" alt="image" src="https://github.com/user-attachments/assets/02fd5531-53d8-4ef4-a6c0-71d12d2fb1a2" />

step-6: cd Strapi-Repo

step-7: terraform init

step-8: terraform plan

step-8: terraform apply --auto-approve (--auto-approve --> without permission). It will create infra like EC2 and SG also it deploys strapi application on Docker Conatiner.

step-9: Wait for few minutes because it takes 2-3 minutes for installing dependencies after creating container and then access with public ip + strapi default port no.(1337).

<img width="806" height="427" alt="image" src="https://github.com/user-attachments/assets/8eeba449-d3ea-4973-971b-2290aadc52f4" />

step-10: Click on create the first administrator and it takes it to admin page register with required details and sign in.

step-11: Deployment is complete this is STRAPI admin page
Here Strapi is used to Creates APIs and Manages Content.

<img width="931" height="452" alt="image" src="https://github.com/user-attachments/assets/2af9af2f-2192-4760-8728-3155f3c4162c" />
