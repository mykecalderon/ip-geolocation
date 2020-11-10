FROM node:12.19.0-alpine3.10
 
WORKDIR /backend
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 8080
 
CMD [ "npm", "start" ]