FROM node:18-slim

COPY package.json /src/package.json
WORKDIR /src

RUN npm install

COPY unifai.js /src

CMD ["node", "unifai"]
