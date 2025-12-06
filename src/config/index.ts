import dotenv from "dotenv";
import Path from "path";
dotenv.config({ path: Path.join(process.cwd(), ".env") });

const config={
    connection_string: process.env.CONNECTION_STRING,
    port: process.env.PORT || 5000,
    jwt_secret: process.env.JWT_SECRET
}
export default config;