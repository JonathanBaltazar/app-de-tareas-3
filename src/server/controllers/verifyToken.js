import jwt from "jsonwebtoken";

// LOCAL MODULES
import config from "../config.js";

// THIS FUNCION, VERIFYS IF THE TOKEN IS VALID
let verifyToken = (req, res, next) => {
    let { token } = req.cookies;

    if (token) {
        jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token",
                });
            }
            req.user_id = decoded.id;
            next();
        });
    } else {
        res.status(401).json({
            message: "No token provided",
        });
    }
};

export default verifyToken;
