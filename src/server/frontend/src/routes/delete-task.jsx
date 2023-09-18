import { redirect, redirectDocument, useNavigate } from "react-router-dom";

// LOCAL MODULES
import { deleteTask } from "../api/tasks";

export let action = async ({ params }) => {
    await deleteTask(params.id);
    return redirectDocument("/tasks");
    // return null;
};
