FROM nginx:latest


WORKDIR /app
COPY build/ /usr/share/nginx/html
# COPY default.conf default.conf
EXPOSE 80