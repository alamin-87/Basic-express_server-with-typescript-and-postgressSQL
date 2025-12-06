import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_string}`,
});
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
        age INT NOT NULL,
        phone VARCHAR(15) ,
        address TEXT,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
        )
     `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
    )
  `);
};
export default  initDB ;