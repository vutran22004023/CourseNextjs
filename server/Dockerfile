FROM node:21.2.0-alpine
WORKDIR /app
COPY . .
RUN yarn install --production && npm i nodemon --dev
CMD ["npx", "nodemon", "src/server.js"]
EXPOSE 3002