// LOCAL MODULES
import pool from "../database.js";
import genDate from "../libs/genDate.js";

export let getTasks = async (req, res) => {
    try {
        let tasks = await pool.query(
            `SELECT * FROM tasks WHERE user_id = ${req.user_id}`
        );
        res.status(200).json({
            tasks: tasks[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting tasks",
        });
    }
};
export let getTask = async (req, res) => {
    let { id } = req.params;
    try {
        let task = await pool.query(
            `SELECT * FROM tasks WHERE task_id = ${id} AND user_id = ${req.user_id}`
        );
        res.json({
            task: task[0][0],
        });
    } catch (error) {
        res.status(500).json({
            message: "Error getting task",
        });
    }
};
export let createTask = async (req, res) => {
    let { title, description, task_date } = req.body;
    console.log(task_date);

    if (title.length > 0) {
        // let date = genDate();
        try {
            await pool.query(
                `INSERT INTO tasks (title, description, date, user_id) VALUES ('${title}', '${
                    !description ? "" : description
                }', '${!task_date ? genDate() : task_date}', '${req.user_id}')`
            );
            res.json({
                message: "Task created",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error saving task",
            });
        }
    } else {
        res.status(400).json(["Title is required"]);
    }
};
export let updateTask = async (req, res) => {
    let { id } = req.params;
    let { title, description, task_date } = req.body;

    if (title.length > 0) {
        try {
            let response = await pool.query(
                `UPDATE tasks SET title = '${title}', description = '${description}', date = '${
                    !task_date ? genDate() : task_date
                }' WHERE task_id = ${id} AND user_id = ${req.user_id} `
            );
            if (response[0].affectedRows == 1) {
                res.json({
                    message: "Task updated",
                });
            } else {
                res.status(404).json({
                    message: "Task not found",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error updating task",
            });
        }
    } else {
        res.status(400).json({
            message: "Title is required",
        });
    }
};

export let updateTaskStatus = async (req, res) => {
    let { id } = req.params;
    let { done } = req.body;

    try {
        await pool.query(
            `UPDATE tasks SET state = ${done} WHERE task_id = ${id} AND user_id = ${req.user_id} `
        );
        res.json({
            message: "State updated",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating state",
        });
    }
};

export let deleteTask = async (req, res) => {
    let { id } = req.params;

    try {
        let response = await pool.query(
            `DELETE FROM tasks WHERE task_id = ${id} AND user_id = ${req.user_id}`
        );
        if (response[0].affectedRows == 1) {
            res.json({
                message: "Task deleted",
            });
        } else {
            res.status(404).json({
                message: "Task not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting task",
        });
    }
};
