FROM ubuntu:focal

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && apt-get install -y \
        vim git python3 g++ make python3-distutils

RUN git clone https://github.com/nodejs/node.git

WORKDIR /node
RUN ./configure
RUN make -j4

CMD tail -f /dev/null
