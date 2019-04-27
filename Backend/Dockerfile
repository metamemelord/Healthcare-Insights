FROM node:8
WORKDIR /app
COPY ./package.json .
RUN npm install
# Copying everything to enable standalone usage
COPY . .
RUN ls
RUN npm run build
RUN ls /app/dist
CMD ["npm", "run", "start"]