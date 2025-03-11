# Tutorials API - Express & SQLite3

## Overview

This project is a simple RESTful API built using **Express.js** and **SQLite3**. It provides CRUD operations for managing tutorials, including adding, retrieving, updating, and deleting tutorial records.

## Features

- **Create** a new tutorial
- **Retrieve** all tutorials or a single tutorial by ID
- **Update** tutorial details by ID
- **Delete** a specific tutorial or all tutorials
- \*\*Retrieve published tutorials only

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Middleware:** CORS, Express JSON

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [SQLite3](https://www.sqlite.org/download.html)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/samDeopa/mountBlue_Assignments/tree/main/REST_API_EXPRESS.git
   cd REST_API_EXPRESS
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:8080/`

## API Endpoints

### Base URL: `http://localhost:8080/api/tutorials`

| Method | Endpoint     | Description                 |
| ------ | ------------ | --------------------------- |
| POST   | `/`          | Create a new tutorial       |
| GET    | `/`          | Retrieve all tutorials      |
| GET    | `/:id`       | Retrieve tutorial by ID     |
| PUT    | `/:id`       | Update tutorial by ID       |
| DELETE | `/:id`       | Delete tutorial by ID       |
| DELETE | `/`          | Delete all tutorials        |
| GET    | `/published` | Get all published tutorials |

## Database Setup

The API uses an SQLite database named `tutorials.db`. If it does not exist, it will be created automatically.

To initialize the `tutorials` table, you can run:

```sql
CREATE TABLE IF NOT EXISTS tutorials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  published BOOLEAN DEFAULT FALSE
);
```

## Example Requests

### Create a New Tutorial

**POST** `/api/tutorials`

```json
{
  "title": "Learn Node.js",
  "description": "A tutorial on Node.js",
  "published": true
}
```

### Get All Tutorials

**GET** `/api/tutorials`

### Update a Tutorial

**PUT** `/api/tutorials/1`

```json
{
  "title": "Updated Title",
  "description": "Updated Description",
  "published": false
}
```

### Delete a Tutorial

**DELETE** `/api/tutorials/1`

## Postman Collection

A Postman collection is available to test the API endpoints. You can import the following file into Postman:

**[TutorialsApi.postman_collection.json](./TutorialsApi.postman_collection.json)**
