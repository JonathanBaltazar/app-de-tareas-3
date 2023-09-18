// LOCAL MODULES
import pool from "../database.js";
import { findUserByEmail } from "./findUser.js";

let saveUser = async (username, email, password, date) => {
    try {
        await pool.query(
            `INSERT INTO users (username, email, password, date) VALUES ('${username}', '${email}', '${password}', '${date}')`
        );
        return findUserByEmail(email);
    } catch (error) {
        return error;
    }
};

export default saveUser;
