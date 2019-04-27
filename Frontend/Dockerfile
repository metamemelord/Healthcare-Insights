FROM node:8
WORKDIR /app
COPY ./package.json .
RUN npm install
# Copying everything to enable standalone usage
COPY . .
CMD ["npm", "run", "serve"]