FROM node

WORKDIR /app

COPY . .

RUN npm i

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["node", "server"]
