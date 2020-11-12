FROM node:10
 
WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma/ ./prisma/

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "start"]