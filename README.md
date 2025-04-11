
Built by https://www.blackbox.ai

---

```markdown
# Airport Flight Information Display System Manager

## Project Overview
The **Airport Flight Information Display System Manager** is a web application that allows users to manage flight information effectively. It provides a RESTful API for storing, retrieving, updating, and deleting flight data. This project is designed for demonstration and development purposes, utilizing in-memory storage to facilitate easy testing and development without requiring a database connection.

## Installation

To install the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/airport-fids-manager.git
   cd airport-fids-manager
   ```

2. **Install dependencies:**
   You will need Node.js installed on your machine. After cloning the repository, run:
   ```bash
   npm install
   ```

## Usage

To run the application, you can use the following commands:

- For development mode (with auto-reload):
  ```bash
  npm run dev
  ```

- For production mode:
  ```bash
  npm start
  ```

Once the server is running, access the API at `http://localhost:8000/api/flights`.

### API Endpoints

1. **GET /api/flights** - Retrieve a list of all flights.
2. **POST /api/flights** - Add a new flight. The request body should contain:
   ```json
   {
     "flightNumber": "string",
     "airline": "string",
     "direction": "string",
     "airport": "string",
     "airportCode": "string",
     "scheduledTime": "string",
     "status": "string"
   }
   ```
3. **PUT /api/flights/:id** - Update an existing flight by ID.
4. **DELETE /api/flights/:id** - Delete a flight by ID.

## Features
- RESTful API for managing flight information
- In-memory data storage for development purposes
- CORS support for cross-origin requests
- Error handling and response for missing or invalid data
- Easy setup and quick deployment

## Dependencies
The project includes the following dependencies:

- **express**: A fast web framework for Node.js.
- **cors**: Middleware to enable CORS (Cross-Origin Resource Sharing).
- **dotenv**: Module to load environment variables from a `.env` file.
- **mysql2**: MySQL client for Node.js (not utilized in this demo but included for future database integration).

### Development Dependencies
- **nodemon**: A tool that helps develop Node.js applications by automatically restarting the server when file changes are detected.

## Project Structure
```
airport-fids-manager/
├── package.json
├── package-lock.json
├── .env (not included by default, for your environment variables)
└── server.js
```

### File Descriptions
- **package.json**: Contains metadata about the project, dependencies, and scripts for running the application.
- **server.js**: The main application file that sets up the Express server and API routes.
- **.env**: Environment file for sensitive configurations like database URLs and API keys (if any).

## License
This project is licensed under the MIT License. See the license file for details.
```