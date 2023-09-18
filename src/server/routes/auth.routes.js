import { Router } from "express";
let router = Router();

// SCHEMAS
import { registerSchema } from "../schemas/auth.schema.js";
// SECONDARY CONTROLLERS
import verifyToken from "../controllers/verifyToken.js";
import validateSchema from "../controllers/validator.js";
// MAIN CONTROLLERS
import {
    registerController,
    loginController,
    logoutController,
    verifyTokenSController,
} from "../controllers/auth.controllers.js";

router.post("/register", validateSchema(registerSchema), registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/verify-token", verifyToken, verifyTokenSController);

export default router;
