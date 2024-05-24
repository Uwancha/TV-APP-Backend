## TV Networks APP | Backend
This project is a Node.js backend server that provides APIs and real-time updates for a admin panel and customer pages for the TV Networks APP. related to a system managing users, programs, channels, etc. 

It uses Node.js/Express.js, Prisma with PostgreSQL database, Socket.IO for real-time notifications and JWT, etc.


### Setup Instructions

- Clone the repository

- Install dependencies

- Configure the database

Create a .env file in the root of the project with the following content:
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"

- Generate Prisma Client

- Run database migrations

- Start the server

The server will run on http://localhost:5000.

### API Endpoints
/routes/dashboard - Retrieves the data for the dashboard charts.
/routes/programs - Manges CRUD operations related programs.
/routes/channels - Manges CRUD operations related channels.
/routes/auth - Handles user registration and login.

### WebSocket Events
database-changed - Emitted when there is a change in the database to notify the frontend.

Project Structure
src/ - Contains the source code.
controllers/ - Contains the request handlers.
routes/ - Contains the API routes.
middleware/ - Middlewares for input validation, authentication and authorization.
prisma/ - Contains Prisma schema and migration files.
app.ts - The entry point of the application.
