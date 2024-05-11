FROM node:lts-slim  as builder

RUN npm config set registry https://registry.npmmirror.com
# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
# RUN apk update && apk add tzdata && npm install -g pnpm && npm install vite -g

WORKDIR /src-root

COPY . /src-root

RUN  npm install -g pnpm && npm install vite -g && pnpm install && pnpm build


FROM nginx:stable-alpine3.19

LABEL maintainer="imoowi"

EXPOSE 80

COPY --from=builder /src-root/dist /usr/share/nginx/html
COPY --from=builder /src-root/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src-root/gzip.conf /etc/nginx/conf.d/gzip.conf
COPY --from=builder /src-root/ssl /usr/share/nginx/ssl
# COPY ssl /usr/share/nginx/ssl
ENTRYPOINT nginx -g "daemon off;"