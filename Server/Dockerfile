# 1️⃣ Base image
FROM node:18-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# 6️⃣ Copy rest of the app
COPY . .

# 7️⃣ Expose port
EXPOSE 5000

# 8️⃣ Start the server
CMD ["npm", "start"]
