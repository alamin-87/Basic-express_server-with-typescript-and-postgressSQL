# Basic Express Server with TypeScript and PostgreSQL

**Project**: Basic Express server using TypeScript and PostgreSQL.

**Prerequisites**
- **Node**: Install Node.js (LTS recommended).
- **npm**: Comes with Node.js.
- **PostgreSQL**: Running instance and a database you can connect to.

**Quick Setup**
- **Clone repo**:

```powershell
git clone https://github.com/alamin-87/Basic-express_server-with-typescript-and-postgressSQL.git
cd Basic-express_server-with-typescript-and-postgressSQL
```

- **Install dependencies** (reads `package.json` and installs all deps/devDeps):

```powershell
npm install
```

**Install (explicit commands)**
If you prefer to install packages manually, these commands match the project's dependencies:

```powershell
# runtime deps
npm i express pg dotenv

# dev deps
npm i -D typescript tsx @types/express @types/pg
```

**Environment**
- Create a `.env` file in the project root with your DB and port settings. Example:

```
PGHOST=localhost
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=your_database_name
PGPORT=5432
PORT=3000
```

**Run (development)**
- The project defines a `dev` script in `package.json` that uses `tsx` to run TypeScript directly:

```powershell
npm run dev
```

This runs `npx tsx watch src/server.ts` (see `package.json`).

**Build & Run (optional)**
- If you want to compile to JavaScript and run the compiled output:

```powershell
# compile to /dist (ensure tsconfig.json target/outDir are configured)
npx tsc
node dist/server.js
```

**Common npm commands**
- **Install dependencies**: `npm install`
- **Add a dependency**: `npm i <package>`
- **Add a dev dependency**: `npm i -D <package>`
- **Run dev server**: `npm run dev`

**Database notes**
- Ensure your PostgreSQL server is running and the credentials in `.env` are correct.
- Create the database and any tables your app expects before starting the server.

**Where to look**
- Main server file: `src/server.ts`.
- TypeScript config: `tsconfig.json`.
- npm scripts and deps: `package.json`.
