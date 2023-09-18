import { createContext, useState, useEffect } from "react";

// LOCAL MODULES
import {
    createTask,
    getTasks,
    deleteTask,
    editTask,
    changeState,
} from "../api/tasks";

export const TasksContext = createContext();

export function TasksContextProvider({ children }) {
    const [tasksErrors, setTasksErrors] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (tasksErrors.length > 0) {
            let timerId = setTimeout(() => {
                setTasksErrors([]);
            }, 10000);
            return () => clearTimeout(timerId);
        }
    }, [tasksErrors]);

    let createNewTask = async (task) => {
        try {
            let res = await createTask(JSON.stringify(task));
            return res;
        } catch (error) {
            let errors = error.response.data;
            setTasksErrors(errors);
        }
    };

    let getAllTasks = async () => {
        try {
            let tasks = await getTasks();
            setTasks(tasks.data.tasks);
        } catch (error) {
            console.log(error);
        }
    };

    // SINGULAR
    let delete_task = async (id) => {
        try {
            let res = await deleteTask(id);
            if (res.status == 200) {
                setTasks(tasks.filter((task) => task.task_id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };
    // PLURAL
    let delete_tasks = async (id) => {
        try {
            await deleteTask(id);
        } catch (error) {
            console.log(error);
        }
    };

    let edit_task = async (task, id) => {
        try {
            return await editTask(id, JSON.stringify(task));
        } catch (error) {
            console.log(error);
            setTasksErrors(error.response.data);
        }
    };

    let changeTaskState = async (id, taskState) => {
        let data = JSON.stringify({ done: taskState });
        try {
            setTasks(
                tasks.map((task) =>
                    task.task_id === id ? { ...task, state: taskState } : task
                )
            );
            await changeState(id, data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TasksContext.Provider
            value={{
                createNewTask,
                tasksErrors,
                tasks,
                getAllTasks,
                delete_task,
                edit_task,
                changeTaskState,
                setTasks,
                delete_tasks,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}
