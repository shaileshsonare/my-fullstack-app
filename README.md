# Employee Management Fullstack Application

This project features a frontend and a backend API for managing employees. The backend has been converted to **Java Spring Boot** and uses **MySQL** as its database. 

## Getting Started

### Prerequisites
- Java 17+
- Maven
- MySQL Server

### Running the Backend

1. Open a terminal and navigate to the `backend` directory.
2. Ensure your MySQL server is running and a database named `company` exists. You may configure the DB user/password in `backend/src/main/resources/application.properties`.
3. Run the Spring Boot application using Maven:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. The backend will start on `http://localhost:3000`.

## API CRUD Operations Sequence Diagrams

Below are the detailed sequence diagrams illustrating the data flow across the Spring Boot components (Client -> Controller -> Repository -> Database) for every operation.

### 1. Create (POST `/api/employees`)

```mermaid
sequenceDiagram
    actor Client
    participant Controller as EmployeeController
    participant Repository as EmployeeRepository
    participant DB as MySQL Database

    Client->>Controller: POST /api/employees (Employee JSON)
    activate Controller
    Controller->>Repository: save(employee)
    activate Repository
    Repository->>DB: INSERT INTO employees (name, department, salary)
    activate DB
    DB-->>Repository: Success (Generated ID)
    deactivate DB
    Repository-->>Controller: Saved Employee Entity
    deactivate Repository
    Controller-->>Client: 201 Created (Message & employeeId)
    deactivate Controller
```

### 2. Read All (GET `/api/employees`)

```mermaid
sequenceDiagram
    actor Client
    participant Controller as EmployeeController
    participant Repository as EmployeeRepository
    participant DB as MySQL Database

    Client->>Controller: GET /api/employees
    activate Controller
    Controller->>Repository: findAll()
    activate Repository
    Repository->>DB: SELECT * FROM employees
    activate DB
    DB-->>Repository: ResultSet
    deactivate DB
    Repository-->>Controller: List<Employee>
    deactivate Repository
    Controller-->>Client: 200 OK (List of Employees JSON)
    deactivate Controller
```

### 3. Read by ID (GET `/api/employees/{id}`)

```mermaid
sequenceDiagram
    actor Client
    participant Controller as EmployeeController
    participant Repository as EmployeeRepository
    participant DB as MySQL Database

    Client->>Controller: GET /api/employees/{id}
    activate Controller
    Controller->>Repository: findById(id)
    activate Repository
    Repository->>DB: SELECT * FROM employees WHERE id = ?
    activate DB
    DB-->>Repository: ResultSet (Employee or Empty)
    deactivate DB
    Repository-->>Controller: Optional<Employee>
    deactivate Repository
    alt Employee exists
        Controller-->>Client: 200 OK (Employee JSON)
    else Employee not found
        Controller-->>Client: 404 Not Found (Error Message JSON)
    end
    deactivate Controller
```

### 4. Update (PUT `/api/employees/{id}`)

```mermaid
sequenceDiagram
    actor Client
    participant Controller as EmployeeController
    participant Repository as EmployeeRepository
    participant DB as MySQL Database

    Client->>Controller: PUT /api/employees/{id} (Updated JSON)
    activate Controller
    Controller->>Repository: findById(id)
    activate Repository
    Repository->>DB: SELECT * FROM employees WHERE id = ?
    activate DB
    DB-->>Repository: ResultSet
    deactivate DB
    Repository-->>Controller: Optional<Employee>
    deactivate Repository
    
    alt Employee exists
        Controller->>Controller: Update entity properties
        Controller->>Repository: save(updatedEmployee)
        activate Repository
        Repository->>DB: UPDATE employees SET ...
        activate DB
        DB-->>Repository: Success
        deactivate DB
        Repository-->>Controller: Saved Employee Entity
        deactivate Repository
        Controller-->>Client: 200 OK (Success Message JSON)
    else Employee not found
        Controller-->>Client: 404 Not Found (Error Message JSON)
    end
    deactivate Controller
```

### 5. Delete (DELETE `/api/employees/{id}`)

```mermaid
sequenceDiagram
    actor Client
    participant Controller as EmployeeController
    participant Repository as EmployeeRepository
    participant DB as MySQL Database

    Client->>Controller: DELETE /api/employees/{id}
    activate Controller
    Controller->>Repository: findById(id)
    activate Repository
    Repository->>DB: SELECT * FROM employees WHERE id = ?
    activate DB
    DB-->>Repository: ResultSet
    deactivate DB
    Repository-->>Controller: Optional<Employee>
    deactivate Repository
    
    alt Employee exists
        Controller->>Repository: delete(employee)
        activate Repository
        Repository->>DB: DELETE FROM employees WHERE id = ?
        activate DB
        DB-->>Repository: Success
        deactivate DB
        Repository-->>Controller: void
        deactivate Repository
        Controller-->>Client: 200 OK (Success Message JSON)
    else Employee not found
        Controller-->>Client: 404 Not Found (Error Message JSON)
    end
    deactivate Controller
```
