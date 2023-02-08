FROM node:latest as builder
RUN mkdir -p /frontend
WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build -—prod
CMD ["npm","start"]
