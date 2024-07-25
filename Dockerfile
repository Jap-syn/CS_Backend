# Use the official Node.js 22 image.
# https://hub.docker.com/_/node
FROM node:22

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies using the `package.json` and `package-lock.json` files.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container.
COPY . .

# Set the NODE_ENV environment variable
ENV NODE_ENV local

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
