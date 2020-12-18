FROM node:14.5.0-alpine

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY app.js /app
ADD . /app

EXPOSE 3000

CMD [ "npm", "start"]
