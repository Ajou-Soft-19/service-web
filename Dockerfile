FROM node:20.9.0 as builder
LABEL maintainer="jsm5315@ajou.ac.kr"

WORKDIR /home/node/app
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20.9.0-slim
WORKDIR /home/node/app


COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
