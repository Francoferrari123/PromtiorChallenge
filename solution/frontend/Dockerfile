# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

ARG VITE_AGENT_API_URL
ENV VITE_AGENT_API_URL=$VITE_AGENT_API_URL

# Expose the port the app runs on
EXPOSE 5173

# Command to run the app in development mode
CMD ["sh", "-c", "npm install && npm run dev -- --host 0.0.0.0"]
