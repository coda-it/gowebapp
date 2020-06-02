FROM debian:buster

# Install generictools
RUN apt-get -y update && apt-get upgrade -y && apt-get install -y \
curl

# Set env variables
ENV WEBAPP_MONGO_URI=mongodb://localhost:27017 \
WEBAPP_MONGO_DB=webapp \
WEBAPP_HTTP_PORT=3000


RUN mkdir -p /root/scripts
RUN mkdir -p /root/go/src/github.com/coda-it/gowebapp/public
RUN mkdir -p /root/go/src/github.com/coda-it/gowebapp/views

ADD ./public /root/go/src/github.com/coda-it/gowebapp/public
ADD ./views /root/go/src/github.com/coda-it/gowebapp/views
COPY ./gowebapp /root/go/src/github.com/coda-it/gowebapp/
COPY ./docker/webapp/prod/entrypoint.sh /root/scripts/

#ENTRYPOINT /root/scripts/entrypoint.sh
