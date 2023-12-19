FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

RUN npx prisma db push

EXPOSE 5001

CMD ["npm", "run", "start"]