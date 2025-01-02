# School Management Project

## Description
This project is a REST API for managing schools, classrooms, and students. It provides functionality for creating, reading, updating, and deleting data related to schools, classrooms, and students.

The project implements role-based access control (RBAC) with three main roles:

- Superadmin: Full system access.
- School Administrator: Access restricted to their assigned school's resources.
- Student: Limited access to personal data and relevant resources.

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

### Authentication

- **Register a new user**
  - Method: POST
  - URL (local): `http://localhost:3000/api/auth/register`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/auth/register`
  - Request Body (JSON):
    ```json
      {
        "name": "Super Admin",
        "email": "superadmin@example.com",
        "password": "password123",
        "role": "superadmin"
      }
    ```
  - Response Body (JSON):
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2VhNTViMzhlMDIxYmUxZDUwZTci"
      }
    ```

- **Login an existing user**
  - Method: POST
  - URL (local): `http://localhost:3000/api/auth/login`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/auth/login`
  - Request Body (JSON):
    ```json
      {
        "email": "superadmin@example.com",
        "password": "password123"
      }
    ```
  - Response Body (JSON):
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2VhNTViMzhlMDIxYmUxZDUwZTci"
      }
    ```

### Schools

- **Get all schools**
  - Method: GET
  - URL (local): `http://localhost:3000/api/schools`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/schools`
  - Requires Bearer Token: Yes
  - Response Body (JSON):
    ```json
      [
        {
            "_id": "6776168d9472d392a461c9d8",
            "name": "ABC High School",
            "address": "123 Main St",
            "city": "Anytown",
            "state": "TEXAS",
            "zip": "12345",
            "country": "USA",
            "createdAt": "2025-01-02T04:31:09.064Z",
            "updatedAt": "2025-01-02T04:31:09.065Z",
            "__v": 0
        },
      ]
      ```

- **Create a school**
  - Method: POST
  - URL (local): `http://localhost:3000/api/schools`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/schools`
  - Requires Bearer Token: Yes
  - Request Body (JSON):
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
    - Response Body (JSON):
    ```json
      {
          "name": "Lincoln High School",
          "address": "123 Main St",
          "city": "Anytown",
          "state": "TEXAS",
          "zip": "12345",
          "country": "USA",
          "_id": "6776d4d44c42f7ae9164d909",
          "createdAt": "2025-01-02T18:03:00.430Z",
          "updatedAt": "2025-01-02T18:03:00.430Z",
          "__v": 0
      }
      ```

- **Get school by ID**
  - Method: GET
  - URL (local): `http://localhost:3000/api/schools/{schoolId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/schools/{schoolId}`
  - Requires Bearer Token: Yes
  - Response Body (JSON):
    ```json
      {
          "_id": "6776d4d44c42f7ae9164d909",
          "name": "Lincoln High School",
          "address": "123 Main St",
          "city": "Anytown",
          "state": "TEXAS",
          "zip": "12345",
          "country": "USA",
          "createdAt": "2025-01-02T18:03:00.430Z",
          "updatedAt": "2025-01-02T18:03:00.430Z",
          "__v": 0
      }
    ```

- **Delete a school**
  - Method: DELETE
  - URL (local): `http://localhost:3000/api/schools/{schoolId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/schools/{schoolId}`
  - Requires Bearer Token: Yes
  - Response Body (JSON):
    ```json
      {
          "message": "School deleted successfully"
      }
    ```

### Classrooms

- **Get all classrooms**
  - Method: GET
  - URL (local): `http://localhost:3000/api/classrooms`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/classrooms`
  - Requires Bearer Token: Yes
  - Response Body (JSON):
  ```json
    [
        {
            "_id": "677616be9950a30e2c17d1cb",
            "name": "Second Classroom",
            "capacity": 30,
            "resources": [
                "Whiteboard",
                "Chalk"
            ],
            "schoolId": "6776168d9472d392a461c9d8",
            "createdAt": "2025-01-02T04:31:58.131Z",
            "updatedAt": "2025-01-02T04:31:58.131Z",
            "__v": 0
        },

    ]
    ```

- **Create a classroom**
  - Method: POST
  - URL (local): `http://localhost:3000/api/classrooms`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/classrooms`
  - Requires Bearer Token: Yes
  - Request Body (JSON):
    ```json
    {
      "name": "First Classroom",
      "capacity": 30,
      "resources": ["Whiteboard", "Chalk"],
      "schoolId": "677607e984d8a2230e967b56"
    }
    ```
  - Response Body (JSON):
    ```json
    {
        "name": "Fifth Classroom",
        "capacity": 30,
        "resources": [
            "Whiteboard",
            "Chalk"
        ],
        "schoolId": "677607e984d8a2230e967b56",
        "_id": "6776d5ca4c42f7ae9164d923",
        "createdAt": "2025-01-02T18:07:06.855Z",
        "updatedAt": "2025-01-02T18:07:06.855Z",
        "__v": 0
    }
    ```

- **Get classroom by ID**
  - Method: GET
  - URL (local): `http://localhost:3000/api/classrooms/{classroomId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/classrooms/{classroomId}`
  - Requires Bearer Token: Yes
  - Response Body (JSON):
    ```json
    {
        "_id": "6776d5ca4c42f7ae9164d923",
        "name": "Fifth Classroom",
        "capacity": 30,
        "resources": [
            "Whiteboard",
            "Chalk"
        ],
        "schoolId": "677607e984d8a2230e967b56",
        "createdAt": "2025-01-02T18:07:06.855Z",
        "updatedAt": "2025-01-02T18:07:06.855Z",
        "__v": 0
    }
    ```

- **Delete a classroom**
  - Method: DELETE
  - URL (local): `http://localhost:3000/api/classrooms/{classroomId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/classrooms/{classroomId}`
  - Requires Bearer Token: Yes
  - Response Body (JSON):
    ```json
    {
      "message": "Classroom deleted successfully"
    }
    ```

### Students

- **Get all students**
  - Method: GET
  - URL (local): `http://localhost:3000/api/students`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/students`
  - Requires Bearer Token: Yes
  - Response Body (JSON):
    ```json
      [
      {
          "_id": "6776d6984c42f7ae9164d952",
          "name": "John Doe",
          "email": "johndoe@example.com",
          "phone": "123-456-7890",
          "address": "123 Main St",
          "city": "Anytown",
          "state": "TEXAS",
          "zip": "12345",
          "country": "USA",
          "schoolId": "677607e984d8a2230e967b56",
          "classroomId": "67760a138e465d01f7929d20",
          "createdAt": "2025-01-02T18:10:32.316Z",
          "updatedAt": "2025-01-02T18:10:32.316Z",
          "__v": 0
      }
    ]
    ```

- **Create a student**
  - Method: POST
  - URL (local): `http://localhost:3000/api/students`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/students`
  - Requires Bearer Token: Yes
  - Request Body (JSON):
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
  - Response Body (JSON):
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
          "classroomId": "67760a138e465d01f7929d20",
          "_id": "6776d6984c42f7ae9164d952",
          "createdAt": "2025-01-02T18:10:32.316Z",
          "updatedAt": "2025-01-02T18:10:32.316Z",
          "__v": 0
      }
    ```

- **Delete a student**
  - Method: DELETE
  - URL (local): `http://localhost:3000/api/students/{studentId}`
  - URL (deployed): `https://school-management-system-alop.onrender.com/api/students/{studentId}`
  - Requires Bearer Token: Yes
  - Response Body (JSON):
    ```json
    {
      "message": "Student deleted successfully"
    }
    ```

---

## Authentication Flow
The authentication flow for this project involves the following steps:

1. User registers by providing a name, email, password, and role.
2. The server generates a JWT token upon successful registration and sends it back to the client.
3. The client sends the token in the Authorization header of subsequent requests to authenticate themselves.
4. The server verifies the token and checks if the user is authorized to access the requested resource.
5. If the token is valid and the user is authorized, the server processes the request.
6. If the token is invalid or the user is not authorized, the server returns an appropriate error response.

## Error Codes and Handling
The following error codes are used in this project:

- 400 Bad Request: The request was invalid or cannot be processed.
- 401 Unauthorized: The user is not authenticated or does not have permission to access the requested resource.
- 403 Forbidden: The user is authenticated but does not have permission to access the requested resource.
- 404 Not Found: The requested resource was not found.
- 500 Internal Server Error: An unexpected error occurred on the server.

## Database Schema Diagram
The database schema consists of the following entities:

1. User
    - id (primary key)
    - name
    - email
    - password
    - role (enum: superadmin, school-admin)
    - tokens (array of tokens)

2. School
    - id (primary key)
    - name
    - address
    - city
    - state
    - zip
    - country

3. Classroom
    - id (primary key)
    - name
    - capacity
    - resources (array of resources)
    - schoolId (foreign key referencing School)
4. Student
    - id (primary key)
    - name
    - email
    - phone
    - address
    - city
    - state
    - zip
    - country
    - schoolId (foreign key referencing School)
    - classroomId (foreign key referencing Classroom)

Here's a simple diagram illustrating the relationships between these entities:
```
+---------------+
|     User     |
+---------------+
       |
       | 1:N
       v
+---------------+
|    School    |
+---------------+
       |
       | 1:N
       v
+---------------+
|  Classroom  |
+---------------+
       |
       | 1:N
       v
+---------------+
|   Student   |
+---------------+
```
## Notes

- Ensure MongoDB is running locally or update the `DB_URI` in the `.env` file when running locally.
- For testing the live application, replace `localhost` URLs with the deployed domain.
- Swagger API documentation is available at [http://localhost:3001/api-docs](http://localhost:3001/api-docs) after running `node swagger.js` locally.

---
