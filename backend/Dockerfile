# Use official Node.js base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json first (for efficient layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]