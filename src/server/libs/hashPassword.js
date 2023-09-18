import bcrypt from "bcrypt";

let hashPassword = async (password) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export default hashPassword;
