FROM node:21.2.0-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/server.js"]
EXPOSE 3002