FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "./build"]

