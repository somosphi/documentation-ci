FROM node:12-alpine

LABEL maintainer="henrique.schmidt@somosphi.com"

RUN addgroup -S continuous-integration && \
  adduser documentation -S -G continuous-integration

COPY . /opt/documentation-cli

ENV DEBUG=

RUN cd /opt/documentation-cli && \
  npm install --production --silent && \
  npm run link && \
  npm run chmod

USER documentation:continuous-integration
WORKDIR /home/documentation
