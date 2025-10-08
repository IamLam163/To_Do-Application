### Back-End

# back-end/Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package\*.json ./
RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "start"]

### Frond-End

# front-end/Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package\*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]

### docker-compose.yml

version: '3.8'

services:
backend:
build:
context: ./back-end
ports: - "7000:7000"
environment: - NODE_ENV=development - MONGO_URL=mongodb://mongo:27017/todo
depends_on: - mongo

frontend:
build:
context: ./front-end
ports: - "5173:5173"
environment: - NODE_ENV=development
depends_on: - backend

mongo:
image: mongo:latest
ports: - "27017:27017"
volumes: - mongo-data:/data/db

volumes:
mongo-data:

### Create a YAML File

name: Node.js CI

on:
push:
branches: [ "main" ]
pull_request:
branches: [ "main" ]

jobs:
build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14, 16, 18]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install
      working-directory: ./back-end

    - name: Run backend tests
      run: npm test
      working-directory: ./back-end

    - name: Install frontend dependencies
      run: npm install
      working-directory: ./front-end

    - name: Run frontend build
      run: npm run build
      working-directory: ./front-end
