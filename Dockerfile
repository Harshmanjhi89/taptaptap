# Use an official Node or Bun image (if you're using Bun)
FROM node:18-alpine  # or `FROM jarredsumner/bun:latest` if you're using Bun

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install   # Use `bun install` if using Bun

# Copy the rest of the project files
COPY . .

# Expose the port your app runs on (typically 3000 for Node apps)
EXPOSE 3000

# Define the command to start the app
CMD ["node", "index.html"]
