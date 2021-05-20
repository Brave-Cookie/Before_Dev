FROM node:14.16.1-alpine

WORKDIR /myfolder

COPY . /myfolder/

RUN npm install -g nodemon 
RUN npm install

#EXPOSE 3000

CMD ["nodemon", "www"]
