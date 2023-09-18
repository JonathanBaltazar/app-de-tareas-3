import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";

// STYLES
// import "./css/output.css";
import "./css/index.css";
import "./build.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { TasksContextProvider } from "./context/TasksContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider>
            <AuthProvider>
                <TasksContextProvider>
                    <App />
                </TasksContextProvider>
            </AuthProvider>
        </ChakraProvider>
    </React.StrictMode>
);
