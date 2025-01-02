# School Management Project

## Description
This project is a REST API for managing schools, classrooms, and students. It provides functionality for creating, reading, updating, and deleting data related to schools, classrooms, and students.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TechnoPhasePRO/School-Management-System.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd School-Management-System
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up the environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   DB_URI=mongodb://localhost:27017/school-management-system
   JWT_SECRET=jwt_secret
   ```

---

## Running the Application Locally

1. Start the server:
   ```bash
   npm start
   ```

2. The server will be available at:
   [http://localhost:3000](http://localhost:3000)

---

## Using the Deployed Application

The application is deployed and can be accessed at:
[https://school-management-system-alop.onrender.com](https://school-management-system-alop.onrender.com)

### Testing via Postman or Curl
If you are testing the deployed application, use the provided domain instead of `http://localhost:3000`. For example:
- To get all schools:
  - **Deployed URL:** `https://school-management-system-alop.onrender.com/api/schools`

---

## Swagger Documentation

To access Swagger documentation and test APIs locally:

1. Start the Swagger server:
   ```bash
   node swagger.js
   ```

2. Open your browser and navigate to:
   [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

## API Endpoints

### Schools

- **Get all schools**
  - Method: GET
  - URL (local): `http://localhost:3000/api/schools`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/schools`

- **Create a school**
  - Method: POST
  - URL (local): `http://localhost:3000/api/schools`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/schools`
  - Body (JSON):
    ```json
    {
      "name": "Lincoln High School",
      "address": "123 Main St",
      "city": "Anytown",
      "state": "TEXAS",
      "zip": "12345",
      "country": "USA"
    }
    ```

- **Get school by ID**
  - Method: GET
  - URL (local): `http://localhost:3000/api/schools/{schoolId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/schools/{schoolId}`

- **Delete a school**
  - Method: DELETE
  - URL (local): `http://localhost:3000/api/schools/{schoolId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/schools/{schoolId}`

### Classrooms

- **Get all classrooms**
  - Method: GET
  - URL (local): `http://localhost:3000/api/classrooms`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/classrooms`

- **Create a classroom**
  - Method: POST
  - URL (local): `http://localhost:3000/api/classrooms`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/classrooms`
  - Body (JSON):
    ```json
    {
      "name": "First Classroom",
      "capacity": 30,
      "resources": ["Whiteboard", "Chalk"],
      "schoolId": "677607e984d8a2230e967b56"
    }
    ```

- **Get classroom by ID**
  - Method: GET
  - URL (local): `http://localhost:3000/api/classrooms/{classroomId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/classrooms/{classroomId}`

- **Delete a classroom**
  - Method: DELETE
  - URL (local): `http://localhost:3000/api/classrooms/{classroomId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/classrooms/{classroomId}`

### Students

- **Get all students**
  - Method: GET
  - URL (local): `http://localhost:3000/api/students`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/students`

- **Create a student**
  - Method: POST
  - URL (local): `http://localhost:3000/api/students`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/students`
  - Body (JSON):
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "123-456-7890",
      "address": "123 Main St",
      "city": "Anytown",
      "state": "TEXAS",
      "zip": "12345",
      "country": "USA",
      "schoolId": "677607e984d8a2230e967b56",
      "classroomId": "67760a138e465d01f7929d20"
    }
    ```

- **Delete a student**
  - Method: DELETE
  - URL (local): `http://localhost:3000/api/students/{studentId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/students/{studentId}`

---

## Notes

- Ensure MongoDB is running locally or update the `DB_URI` in the `.env` file when running locally.
- For testing the live application, replace `localhost` URLs with the deployed domain.
- Swagger API documentation is available at [http://localhost:3001/api-docs](http://localhost:3001/api-docs) after running `node swagger.js` locally.

---
