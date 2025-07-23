FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install axios @types/axios

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"] 