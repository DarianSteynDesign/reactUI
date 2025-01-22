# Running the Backend API Locally

## 1. Setting Up MongoDB

### a. Running MongoDB in Docker
Run the following command to start a MongoDB container:
```bash
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

### b. Verifying the MongoDB Container
Check if the container is running:
```bash
docker ps
```

### c. Running MongoDB with Persistent Storage
Use this command to ensure data is persisted across container restarts:
```bash
docker run --name mongodb -p 27017:27017 -v mongodbdata:/data/db -d mongo:latest
```

---

## 2. Database Structure
- **Database Name**: `User`
- **Collection Name**: `Users`
- **Collection Name**: `Posts`
- **Collection Name**: `Products`

---

## 3. Running the Project

1. Navigate to the backend directory:
   ```bash
   cd express-api
   ```
2. Start the development server:
   ```bash
   sudo npm run dev
   ```
3. Navigate to the frontend directory:
   ```bash
   cd next
   ```
4. Start the development server:
   ```bash
   sudo npm run dev:next
   ```

---

### Notes
- Ensure Docker is installed and running.
- Use `docker volume ls` to confirm the `mongodbdata` volume is created for persistent storage.
