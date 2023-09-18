import { Router } from "express";

// LOCAL MODULES

// SCHEMAS
import { createTaskSchema, editTaskSchema } from "../schemas/tasks.schema.js";
import validateSchema from "../controllers/validator.js";
import verifyToken from "../controllers/verifyToken.js";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
} from "../controllers/tasks.controllers.js";

let router = Router();

router.get("/tasks", verifyToken, getTasks);
router.get("/tasks/:id", verifyToken, getTask);
router.post(
    "/create-task",
    verifyToken,
    validateSchema(createTaskSchema),
    createTask
);
router.put(
    "/edit-task/:id",
    verifyToken,
    validateSchema(editTaskSchema),
    updateTask
);

router.put("/done/:id", verifyToken, updateTaskStatus);

router.delete("/delete-task/:id", verifyToken, deleteTask);

export default router;
