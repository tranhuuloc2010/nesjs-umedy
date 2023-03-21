FROM node:14-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

#CMD [ "yarn", "run", 'start:dev' ]
# docker build --tag node-docker .
# docker run -p 8080:8080 -d node-docker
