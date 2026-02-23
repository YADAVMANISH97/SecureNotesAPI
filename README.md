# SecureNotes API

A secure REST API for managing notes with JWT authentication and role-based access control.

## Features

- ✅ User registration and login with JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (User/Admin)
- ✅ CRUD operations for notes
- ✅ Users can only access their own notes
- ✅ Admin panel to view all users and notes
- ✅ MongoDB database integration

## Tech Stack

- **Node.js** & **Express.js** - Backend framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SecureNotesAPI.git
cd SecureNotesAPI
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm start
```

Server runs at `http://localhost:3000`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Notes (Protected)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/notes/` | Create a note | ✅ |
| GET | `/api/notes/` | Get all user's notes | ✅ |
| GET | `/api/notes/:id` | Get note by ID | ✅ |
| PUT | `/api/notes/:id` | Update a note | ✅ |
| DELETE | `/api/notes/:id` | Delete a note | ✅ |

### Admin Routes (Admin Only)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes/admin/users` | Get all users | ✅ Admin |
| GET | `/api/notes/admin/all` | Get all notes | ✅ Admin |
| DELETE | `/api/notes/admin/:id` | Delete any note | ✅ Admin |

## Request Examples

### Register User
```json
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Note (requires Bearer token)
```json
POST /api/notes/
Authorization: Bearer <your_jwt_token>

{
  "title": "My Note",
  "content": "This is my note content"
}
```

## Project Structure

```
SecureNotesAPI/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Auth logic
│   └── noteController.js  # Note & admin logic
├── middleware/
│   ├── auth.js           # JWT verification
│   └── isAdmin.js        # Admin check
├── models/
│   ├── note.js           # Note schema
│   └── user.js           # User schema
├── routes/
│   ├── authRoutes.js     # Auth routes
│   └── noteRoutes.js     # Note routes
├── .env                  # Environment variables (not in repo)
├── .gitignore
├── package.json
└── server.js             # Entry point
```

## Environment Variables

Required variables in `.env`:

- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing

## License

MIT
