import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// ROUTES MODULES
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

let __dirname = dirname(fileURLToPath(import.meta.url));
// console.log();

let app = express();

app.set("port", process.env.PORT || 3000);

const whiteList = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5173",
];

// MIDDLEWARES
app.use(cookieParser());
app.use(
    cors({
        origin: whiteList,
        credentials: true,
    })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(join(__dirname, "../frontend/build")));

// ROUTES
app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;
