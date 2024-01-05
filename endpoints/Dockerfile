FROM node:16-alpine as base

RUN mkdir -p /opt/app
WORKDIR /opt/app

# Installing dependencies
COPY package*.json /opt/app/
RUN npm install --verbose
COPY . /opt/app
FROM base as production
RUN npm run build --verbose
# Build app
CMD ["node", "./dist/index.js"]