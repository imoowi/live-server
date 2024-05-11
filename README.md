# live-server
# 直播服务

## 启动服务
```sh
docker-compose up -d --build
```
## 推流测试
```sh
docker run --net=live-server_live-server --rm -it registry.cn-hangzhou.aliyuncs.com/ossrs/srs:encoder   ffmpeg -stream_loop -1 -re -i doc/source.flv -c copy     -f flv rtmp:srs/live/2024-05-11/0_MPFyvuZL?token=d26ac09aa16da8722754db7d45d5b10d
```
## 播放测试
- 用vlc播放器播放以下地址 
  
  rtmp://localhost/live/2024-05-11/0_MPFyvuZL?token=d26ac09aa16da8722754db7d45d5b10d
