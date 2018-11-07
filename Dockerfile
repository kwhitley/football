FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY .npmrc /usr/src/app
COPY package.json /usr/src/app
RUN yarn

COPY . /usr/src/app
RUN npm rebuild node-sass
RUN npm run build
RUN rm -f /usr/src/app/.npmrc

EXPOSE 5000
CMD [ "npm", "start" ]