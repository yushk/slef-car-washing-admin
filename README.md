
##  服务器一键部署

```bash

# 登录docker
docker login -u your_name -p your_password
sudo docker login --username=yushk9440 registry.cn-hangzhou.aliyuncs.com -p yu361000

# 编译项目
npm run build


# 制作镜像 推送镜像
npm run docker

# 后台编译
make build
# 后台制作镜像推送镜像
make docker

#服务器更新镜像
npm run deploy


# 其他服务镜像同理

# scripty 模块帮助我们自动管理命令 https://github.com/testdouble/
# 利用 scripty npm run deploy 会执行/script 下名为 deploy.sh 脚本 
# 利用ssh 免密登录 远程执行更新 docker-compose 更新脚本 完成服务更新
/deploy 文件夹下为服务器 docker-compose 配置

```

## 本地全局代理

docker run --name nginxproxy -p 10000:80 -v D:\docker\nginx\nginx.conf:/etc/nginx/nginx.conf -d nginx:latest


## TO DO LIST

### 登录

+ [x] 登录页添加人机验证

- [ ] xxx 

### 帐号注册