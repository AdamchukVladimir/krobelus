FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

RUN npm run build --force
 