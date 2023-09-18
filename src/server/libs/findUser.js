import pool from "../database.js";

export let findUserByEmail = async (email) => {
    try {
        let response = await pool.query(
            `SELECT * FROM users WHERE email = '${email}'`
        );
        return response[0];
    } catch (error) {
        console.log(error);
    }
};
export let findUserByUsername = async (username) => {
    try {
        let response = await pool.query(
            `SELECT * FROM users WHERE username = '${username}'`
        );
        return response[0];
    } catch (error) {
        console.log(error);
    }
};
export let findUserById = async (id) => {
    try {
        let response = await pool.query(
            `SELECT * FROM users WHERE user_id = '${id}'`
        );
        return response[0];
    } catch (error) {
        console.log(error);
    }
};
