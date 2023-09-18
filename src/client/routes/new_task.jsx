import { useContext } from "react";

// LOCAL MODULES
import { TasksContext } from "../context/TasksContext";

// COMPONENTS
import TaskForm from "../components/TaskForm";
import Card from "../components/Card";
import Title from "../components/Title";

function NewTask() {
    let { createNewTask, tasksErrors } = useContext(TasksContext);

    return (
        <Card>
            <Title titleName={"Nueva Tarea"} />
            <TaskForm api_function={createNewTask} tasksErrors={tasksErrors} />
        </Card>
    );
}

export default NewTask;
