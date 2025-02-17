# NestJS Application Setup with Docker

## **Prerequisites**

### **Must Install:**
- **Docker Desktop** (Ensure it is running in the background)

## **Port Configuration**
- **Backend Port:** `3000`
- **Database Port:** `3306`

---

## **Steps to Run the NestJS Application**

### **1. Start Docker Containers**
Run the following command in your terminal to start the necessary containers:
```sh
docker-compose up -d
```

### **2. Connect to MySQL Database**
Execute the following command to enter the MySQL database inside the running container:
```sh
docker exec -it mysql_nest mysql -u growthIO -p796
```

### **3. Start the NestJS Application**
In your **VS Code terminal**, run:
```sh
npm run start:dev
```

### **4. Verify Application is Running**
Once all steps are completed successfully, visit:
[http://localhost:3000/](http://localhost:3000/)

If everything is set up correctly, you should see:
```
Hello World!
```

---

## **Code Contribution Guidelines**

### **While Pushing Code:**
1. **Switch to the appropriate branch** (`sahin/sohrab`).
2. **Write and run test code** to ensure functionality.
3. **Upon passing all tests**, the code will be automatically merged into the `master` branch.

---

## **Happy Coding! 🚀**

