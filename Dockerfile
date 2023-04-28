FROM nginx:alpine
LABEL MAINTAINER="yushk <945009587@qq.com>"

COPY dist /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d/
