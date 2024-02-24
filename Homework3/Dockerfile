FROM node:latest
WORKDIR /usr/src/app
COPY package.json /app
RUN npm install
COPY . .
CMD [ "npm", "start" ]