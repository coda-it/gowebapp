FROM debian:bookworm

# Install generictools
RUN apt-get -y update && apt-get upgrade -y && apt-get install -y \
curl \
libc6

# Set env variables
ENV WEBAPP_MONGO_URI=mongodb://localhost:27017 \
WEBAPP_MONGO_DB=webapp \
WEBAPP_HTTP_PORT=3000

RUN mkdir -p /root/scripts
RUN mkdir -p /root/volume
RUN mkdir -p /root/go/src/github.com/coda-it/gowebapp/public/default
RUN mkdir -p /root/go/src/github.com/coda-it/gowebapp/views/default
RUN mkdir -p /root/go/src/github.com/coda-it/gowebapp/views/custom

ADD ./public/default /root/go/src/github.com/coda-it/gowebapp/public/default
ADD ./views/default /root/go/src/github.com/coda-it/gowebapp/views/default
COPY ./gowebapp /root/go/src/github.com/coda-it/gowebapp/
COPY ./docker/webapp/prod/entrypoint.sh /root/scripts/
COPY ./webapp-config.json /root/go/src/github.com/coda-it/gowebapp/

ENTRYPOINT /root/scripts/entrypoint.sh
