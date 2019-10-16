FROM node:alpine
LABEL Higor Alves <higorhaalves@gmail.com>

WORKDIR /user/app
COPY . .
RUN npm install --silent
RUN npm run build
ENV NODE_ENV=production
CMD [ "node", "./build/index.js" ]