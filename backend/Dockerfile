# Use the long-term-support image for Node.js for stability.
FROM node:16

# Set the working directory that Docker will work from.
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install all of the dependencies.
RUN npm install

# Copy the rest of the application files (source).
COPY . .

# Generate the Prisma client to ensure database access via ORM.
RUN npx prisma generate

# Expose the port that will be used for the API.
EXPOSE 3002

# Start the application.
CMD ["npm", "start"]