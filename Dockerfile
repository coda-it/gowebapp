FROM debian:buster

# Install generictools
RUN apt-get -y update && apt-get upgrade -y && apt-get install -y \
curl \
wget \
python \
vim \
git \
build-essential

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
apt-get install -y nodejs

# Install golang
RUN wget https://dl.google.com/go/go1.12.7.linux-amd64.tar.gz && \
tar -C /usr/local -xvf go1.12.7.linux-amd64.tar.gz
ENV PATH="${PATH}:/usr/local/go/bin"

# Set env variables
ENV GOPATH=/root/go \
GO111MODULE=on \
PATH="${PATH}:${GOPATH}/bin"
