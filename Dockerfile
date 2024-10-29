# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

COPY . .

# Expose the port your app runs on (typically 3000 for Node apps)
EXPOSE 3000

# Define the command to start the app
CMD ["node", "index.html"]
