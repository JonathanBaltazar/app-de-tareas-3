import { config } from "dotenv";
config();

let myConfig = {
    SECRET_KEY: process.env.SECRET_KEY || "sEc$_+K3y_",
};

export let PORT = process.env.PORT || 3000;
export let DB_HOST = "localhost";
export let DB_PASS = process.env.DB_PASS || "password";
export let DB_USER = process.env.DB_USER || "root";
export let DB_NAME = process.env.DB_NAME || "test_db";

export default myConfig;
