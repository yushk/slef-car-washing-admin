#!/bin/sh
docker compose stop
docker compose rm -f
docker rmi registry.cn-beijing.aliyuncs.com/yushk/sport_manager
docker rmi registry.cn-beijing.aliyuncs.com/yushk/sport_apiserver
docker rmi registry.cn-beijing.aliyuncs.com/yushk/sport_web
docker compose up -d
docker ps
