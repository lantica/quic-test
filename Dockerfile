FROM ubuntu:bionic

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && apt-get install -y \
        vim git python3 g++ make python3-distutils

RUN git clone https://github.com/nodejs/node.git

WORKDIR /node
RUN git checkout tags/v15.0.1
RUN ./configure --experimental-quic
RUN make -j4
RUN make install

CMD tail -f /dev/null
