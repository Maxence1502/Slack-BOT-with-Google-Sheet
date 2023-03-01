FROM node:19.7-slim

COPY package.json /src/package.json
WORKDIR /src
RUN npm install

COPY unifai.js /src

CMD ["node", "unifai"]
