FROM node:12.19.0-alpine3.10
 
WORKDIR /frontend
 
COPY package*.json ./

RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]