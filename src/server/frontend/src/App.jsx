import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ROUTES COMPONENTS
import Home from "./routes/home";
import Register from "./routes/register";
import Login from "./routes/login";
import Tasks from "./routes/tasks";
import NewTask from "./routes/new_task";
import EditTask, { loader as editTaskLoader } from "./routes/edit_task";
import Profile from "./routes/profile";
import ErrorPage from "./routes/error";
import Task, { loader as taskLoader } from "./routes/task";
import { action as deleteTask } from "./routes/delete-task";

import ProtectedRoute from "./ProtectedRoute";

let router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/tasks",
                element: <Tasks />,
            },
            {
                path: "/task/:id",
                element: <Task />,
                loader: taskLoader,
            },
            {
                path: "/new-task",
                element: <NewTask />,
            },
            {
                path: "/edit-task/:id",
                element: <EditTask />,
                loader: editTaskLoader,
            },
            {
                path: "/delete-task/:id",
                action: deleteTask,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

function App() {
    return (
        // En la clase:
        <div className="">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
