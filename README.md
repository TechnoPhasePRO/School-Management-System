# School Management Project

## Description
This project is a REST API for managing schools, classrooms, and students. It allows creating, reading, updating, and deleting data related to schools, classrooms, and students.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/TechnoPhasePRO/School-Management-System.git
   ```

2. Navigate to the project directory:
   ```bash
   cd School-Management-System
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables by creating a `.env` file in the root directory and adding the following:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/school-management-system
   ```

## Running the Application
Start the server:
```bash
node server.js
```

## Swagger Documentation
To access Swagger documentation and run APIs:
1. Start the Swagger server:
   ```bash
   node swagger.js
   ```
2. Open your browser and navigate to:
   [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

## API Endpoints

### Schools
- **Get all schools**
  - Method: GET
  - URL: `http://localhost:3000/api/schools`

- **Create a school**
  - Method: POST
  - URL: `http://localhost:3000/api/schools`
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
  - URL: `http://localhost:3000/api/schools/{schoolId}`

- **Delete a school**
  - Method: DELETE
  - URL: `http://localhost:3000/api/schools/{schoolId}`

### Classrooms
- **Get all classrooms**
  - Method: GET
  - URL: `http://localhost:3000/api/classrooms`

- **Create a classroom**
  - Method: POST
  - URL: `http://localhost:3000/api/classrooms`
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
  - URL: `http://localhost:3000/api/classrooms/{classroomId}`

- **Update a classroom**
  - Method: PUT
  - URL: `http://localhost:3000/api/classrooms/{classroomId}`
  - Body (JSON):
    ```json
    {
      "name": "Second Classroom",
      "capacity": 40,
      "resources": ["Whiteboard", "Chalk", "Computer"],
      "schoolId": "677607e984d8a2230e967b56"
    }
    ```

- **Delete a classroom**
  - Method: DELETE
  - URL: `http://localhost:3000/api/classrooms/{classroomId}`

### Students
- **Get all students**
  - Method: GET
  - URL: `http://localhost:3000/api/students`

- **Create a student**
  - Method: POST
  - URL: `http://localhost:3000/api/students`
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

- **Get student by ID**
  - Method: GET
  - URL: `http://localhost:3000/api/students/{studentId}`

- **Update a student**
  - Method: PUT
  - URL: `http://localhost:3000/api/students/{studentId}`
  - Body (JSON):
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "123-456-7890",
      "address": "123 Main St",
      "city": "Anytown",
      "state": "California",
      "zip": "12345",
      "country": "USA",
      "schoolId": "677607e984d8a2230e967b56",
      "classroomId": "67760a138e465d01f7929d20"
    }
    ```

- **Delete a student**
  - Method: DELETE
  - URL: `http://localhost:3000/api/students/{studentId}`

---

## Notes
- Ensure MongoDB is running locally or update the `MONGO_URI` in the `.env` file.
- Swagger API documentation is available at [http://localhost:3001/api-docs](http://localhost:3001/api-docs) after running `node swagger.js`.

