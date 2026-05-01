# Team Task Manager

A full-stack web application for managing team projects and tasks with role-based access control.

## Features

- User authentication (Signup/Login)
- Project creation and management
- Task creation, assignment, and status tracking
- Dashboard with task overview and overdue alerts
- Role-based access (Admin/Member)

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, JWT
- **Frontend**: React, Vite
- **Deployment**: Railway

## Installation

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Deployment on Railway

1. Push this repository to GitHub.

2. Connect your GitHub repository to Railway.

3. Set environment variables in Railway dashboard:
   - `MONGO_URI`: Your MongoDB connection string (Railway provides MongoDB or use MongoDB Atlas)
   - `JWT_SECRET`: A secure JWT secret (generate a random string)
   - `PORT`: Leave as default (Railway sets this)

4. Railway will automatically detect the Node.js app and deploy it.

5. The app will be live at the Railway-provided URL.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get user's projects
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/project/:projectId` - Get tasks for project
- `GET /api/tasks/assigned` - Get tasks assigned to user
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Usage

1. Register as an admin or member.
2. Create projects (admins can manage all, members can view assigned).
3. Add tasks to projects and assign to team members.
4. Track progress on the dashboard.

## License

MIT