// LOCAL MODULES
import genDate from "../libs/genDate.js";
import hashPassword from "../libs/hashPassword.js";
import saveUser from "../libs/saveUser.js";
import {
    findUserById,
    findUserByEmail,
    findUserByUsername,
} from "../libs/findUser.js";
import genToken from "../libs/genToken.js";
import verifyPassword from "../libs/verifyPassword.js";

// SCHEMAS
import { usernameAuthSchema, emailAuthSchema } from "../schemas/auth.schema.js";

// SAVING USER IN DATABASE
export let registerController = async (req, res) => {
    let { username, email, password } = req.body;

    try {
        if (username.length > 0 && email.length > 0 && password.length > 0) {
            let date = genDate();
            let hash = await hashPassword(password);

            let userFoundByUsername = await findUserByUsername(username);
            let userFoundByEmail = await findUserByEmail(email);

            if (
                userFoundByEmail.length == 0 &&
                userFoundByUsername.length == 0
            ) {
                // SAVING USER IN DATABASE
                let savedUser = await saveUser(username, email, hash, date);
                // GENERATING TOKEN
                let token = genToken(savedUser[0].user_id);

                res.cookie("token", token, {
                    maxAge: 1000 * 60 * 60 * 24,
                }).json({
                    user_id: savedUser[0].user_id,
                    username: savedUser[0].username,
                    email: savedUser[0].email,
                    date: savedUser[0].date,
                });
            } else {
                if (userFoundByUsername.length > 0) {
                    return res.status(400).json(["Username already exists"]);
                }
                if (userFoundByEmail.length > 0) {
                    return res.status(400).json(["Email already exists"]);
                }
            }
        } else {
            res.status(400).json(["Username, email and password are required"]);
        }
    } catch (error) {
        res.status(500).json(["There was an error saving the user"]);
    }
};
// LOGIN
export let loginController = async (req, res) => {
    let { username, email, password } = req.body;
    // LOGIN BY USERNAME

    try {
        if (username) {
            usernameAuthSchema.parse({ username, password });
            let userFoundByUsername = await findUserByUsername(username);
            if (userFoundByUsername.length > 0) {
                // CHECK PASSWORD
                let result = await verifyPassword(
                    password,
                    userFoundByUsername[0].password
                );
                if (result) {
                    let token = genToken(userFoundByUsername[0].user_id);
                    // console.log(req.cookies);
                    return res
                        .cookie("token", token, {
                            maxAge: 1000 * 60 * 60 * 24,
                        })
                        .json({
                            user_id: userFoundByUsername[0].user_id,
                            username: userFoundByUsername[0].username,
                            email: userFoundByUsername[0].email,
                            date: userFoundByUsername[0].date,
                        });
                } else {
                    return res
                        .status(404)
                        .json(["Username or password is incorrect"]);
                }
            } else {
                return res.status(404).json(["Username not found"]);
            }
        }
        // LOGIN BY EMAIL
        else if (email) {
            emailAuthSchema.parse({ email, password });
            let userFoundByEmail = await findUserByEmail(email);
            if (userFoundByEmail.length > 0) {
                // CHECK PASSWORD
                let result = await verifyPassword(
                    password,
                    userFoundByEmail[0].password
                );
                if (result) {
                    let token = genToken(userFoundByEmail[0].user_id);
                    res.cookie("token", token, {
                        maxAge: 1000 * 60 * 60 * 24,
                    }).json({
                        user_id: userFoundByEmail[0].user_id,
                        username: userFoundByEmail[0].username,
                        email: userFoundByEmail[0].email,
                        date: userFoundByEmail[0].date,
                    });
                } else {
                    return res
                        .status(404)
                        .json(["Email or password is incorrect"]);
                }
            } else {
                return res.status(404).json(["Email not found"]);
            }
        } else {
            res.status(400).json(["Email field or Username field is required"]);
        }
    } catch (error) {
        // return res.status(400).json(error.issues.map((issue) => issue.message));
        console.log(error);
        return res.status(400).json({
            message: "Some error occurred while login",
        });
    }
};
// LOGOUT
export let logoutController = (req, res) => {
    res.cookie("token", "", {
        maxAge: 0,
    }).json({
        message: "User logged out successfully",
    });
};

export let verifyTokenSController = async (req, res) => {
    try {
        let user = await findUserById(req.user_id);
        res.json({
            user_id: user[0].user_id,
            username: user[0].username,
            email: user[0].email,
        });
    } catch (error) {
        res.status(401).json(["User not found"]);
    }
};
