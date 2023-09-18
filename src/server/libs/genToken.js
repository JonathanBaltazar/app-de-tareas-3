import jwt from "jsonwebtoken";

// LOCAL MODULES
import config from "../config.js";

let genToken = (id) => {
    let token = jwt.sign({ id }, config.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
    });
    return token;
};

export default genToken;
