# Basic Express Server with TypeScript and PostgreSQL

**Project**: Basic Express server using TypeScript and PostgreSQL.

**Prerequisites**
- **Node**: Install Node.js (LTS recommended).
# Basic Express Server (TypeScript + PostgreSQL)

Small REST API using Express, TypeScript and PostgreSQL. The app initializes the database schema on startup and exposes simple user, todo and auth endpoints.

**Features**
- TypeScript + `tsx` for fast development
- PostgreSQL integration via `pg` and an automatic schema initializer
- Authentication skeleton (login) and role-based guard on some user routes

**Prerequisites**
- Node.js (LTS recommended)
- npm (comes with Node)
- PostgreSQL server and a database you can connect to

**Environment**
Create a `.env` file at the project root. The app expects the following variables (used by `src/config`):

- `CONNECTION_STRING` – full Postgres connection string, e.g.: `postgresql://user:password@localhost:5432/mydb`
- `PORT` – port the server should listen on (default: `5000`)
- `JWT_SECRET` – secret used to sign JWTs for auth

Example `.env`:

```
CONNECTION_STRING=postgresql://postgres:secret@localhost:5432/testdb
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

**Install**

```powershell
npm install
```

**Run (development)**

```powershell
npm run dev
```

The `dev` script runs `npx tsx watch src/server.ts` (see `package.json`).

**Database initialization**
On startup the app calls `initDB()` in `src/config/db.ts` which will create `users` and `todos` tables if they do not already exist. You only need a valid `CONNECTION_STRING` pointing to a database the server can connect to.

**API Endpoints**
Base URL: `http://localhost:<PORT>` (default port `5000`)

- POST `/auth/login` — login endpoint (expects credentials handled in `auth.controller.ts`)

- Users (`src/modules/user/user.routes.ts`)
	- POST `/users` — create a user (public)
	- GET `/users` — list users (protected: `auth("admin")`)
	- GET `/users/:id` — get single user (protected: `auth("admin","user")`)
	- PUT `/users/:id` — update user
	- DELETE `/users/:id` — delete user

- Todos (`src/modules/todo/todo.route.ts`)
	- POST `/todos` — create todo
	- GET `/todos` — list todos
	- GET `/todos/:id` — get single todo
	- PUT `/todos/:id` — update todo
	- DELETE `/todos/:id` — delete todo

Notes: The `logger` middleware is applied to routes; some user routes are protected by the `auth` middleware which checks roles.

**Example curl requests**

# Login (replace body fields according to your auth controller)
```powershell
curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password"}'
```

# Create a user
```powershell
curl -X POST http://localhost:5000/users -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com","password":"secret","role":"user","age":30}'
```

# Create a todo (replace <TOKEN> with a real JWT if required by auth middleware)
```powershell
curl -X POST http://localhost:5000/todos -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"userId":1,"title":"Buy milk","description":"2 liters"}'
```

**Project structure (important files)**

- `src/server.ts` — app entry; reads config and starts the server
- `src/app.ts` — Express app, route registration and DB init
- `src/config/db.ts` — Postgres pool + `initDB()` that creates tables
- `src/config/index.ts` — loads `.env` and exposes `CONNECTION_STRING`, `PORT`, `JWT_SECRET`
- `src/modules/*` — feature modules (auth, user, todo)

**Scripts**
- `npm run dev` — run with `tsx` in watch mode (development)

**Troubleshooting**
- If the server fails to connect to the DB, verify `CONNECTION_STRING` and that Postgres is reachable.
- Ensure `JWT_SECRET` is set if you use endpoints protected by the auth middleware.

**Request / Response Examples**

- POST `/auth/login`
	- Request body (JSON):
		```json
		{ "email": "user@example.com", "password": "password" }
		```
	- Successful response (200):
		```json
		{
			"success": true,
			"data": {
				"token": "<JWT_TOKEN>",
				"user": {
					"id": 1,
					"name": "Alice",
					"email": "alice@example.com",
					"role": "user",
					"age": 30,
					"phone": null,
					"address": null,
					"created_at": "2025-12-06T12:00:00.000Z",
					"updated_at": "2025-12-06T12:00:00.000Z"
				}
			},
			"message": "login successfully"
		}
		```

- POST `/users`
	- Request body (JSON):
		```json
		{ "name": "Alice", "email": "alice@example.com", "password": "secret", "role": "user", "age": 30 }
		```
	- Successful response (201):
		```json
		{
			"success": true,
			"data": {
				"id": 1,
				"name": "Alice",
				"email": "alice@example.com",
				"role": "user",
				"password": "$2a$10$...", // hashed password is returned by current implementation
				"age": 30,
				"phone": null,
				"address": null,
				"created_at": "2025-12-06T12:00:00.000Z",
				"updated_at": "2025-12-06T12:00:00.000Z"
			},
			"message": "User created successfully"
		}
		```

	- Note: The current implementation returns the full DB row (which includes the hashed `password`). For production it's recommended to omit the `password` field from responses.

- POST `/todos`
	- Request body (JSON):
		```json
		{ "userId": 1, "title": "Buy milk" }
		```
	- Successful response (201):
		```json
		{
			"success": true,
			"message": "Todo created",
			"data": {
				"id": 1,
				"userid": 1,
				"title": "Buy milk",
				"description": null,
				"is_completed": false,
				"created_at": "2025-12-06T12:00:00.000Z",
				"updated_at": "2025-12-06T12:00:00.000Z"
			}
		}
		```

**Postman collection**
I added a minimal Postman collection file (`postman_collection.json`) that contains example requests for `login`, `create user` and `create todo`. Import it into Postman or similar tools and edit the server URL and any auth tokens as needed.

If you'd like, I can now:
- Add more detailed request/response examples for every endpoint, or
- Remove `password` from the create-user response and update the controller to return a safe user object.
