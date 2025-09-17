resource "aws_instance" "strapi_server" {
  tags = {
    Name    = "strapi-server"
    project = "strapi"
  }
  ami               = var.ami_id
  instance_type     = var.instance_type
  key_name          = "mumbai-kp"
  security_groups   = [aws_security_group.strapisg.name]
  user_data         = file("user-data.sh")
  count             = 1
  availability_zone = "ap-south-1a"
  root_block_device {
    volume_size = 20
  }
}
