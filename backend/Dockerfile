FROM node:alpine
WORKDIR /backend
COPY ./package*.json /backend
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","start"]