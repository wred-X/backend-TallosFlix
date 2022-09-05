FROM node:16.13.0-alpine

WORKDIR /main

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --silent

COPY . .

CMD ["npm", "run", "start"]