# Specifies where to get the base image (Node v12.13.1 in our case) and creates a new container for it
FROM node:12

#ADD . /src/server
# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
COPY . .
# Specify port app runs on
EXPOSE 8082

# Run the app
CMD [ "npm", "test" ] 


