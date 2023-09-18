import axios from "./axios";

// PETICIONES AL BACKEND

// OBTENER TODAS LAS TAREAS
export let getTasks = () => {
    try {
        return axios.get("/tasks");
    } catch (error) {
        console.log(error);
    }
};

// OBTENER UNA TAREA
export let getTask = (id) => {
    return axios.get(`/tasks/${id}`);
};

// CREAR TAREA
export let createTask = (task) => {
    return axios.post("/create-task", task);
};

// ELIMINAR TAREA
export let deleteTask = (id) => {
    return axios.delete(`/delete-task/${id}`);
};

// ESTADO DE TAREA
export let changeState = (id, done) => {
    return axios.put(`/done/${id}`, done);
};

// EDITAR TAREA
export let editTask = (id, task) => {
    return axios.put(`/edit-task/${id}`, task);
};
