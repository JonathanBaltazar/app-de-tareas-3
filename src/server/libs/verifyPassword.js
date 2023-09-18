import bcryptjs from "bcryptjs";

let verifyPassword = async (password, hash) => {
    try {
        let result = await bcryptjs.compare(password, hash);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default verifyPassword;
