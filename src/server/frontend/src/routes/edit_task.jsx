import { useContext } from "react";
import { useLoaderData } from "react-router-dom";

// LOCAL MODULES
import { TasksContext } from "../context/TasksContext";
import { getTask } from "../api/tasks";

// COMPONENTS
import TaskForm from "../components/TaskForm";
import Card from "../components/Card";
import Title from "../components/Title";

export let loader = async ({ params }) => {
    let res = await getTask(params.id);
    let task = res.data.task;
    return task;
};

function EditTask() {
    let task = useLoaderData();
    let { edit_task, tasksErrors } = useContext(TasksContext);

    return (
        <Card>
            <Title titleName={"Edita tu tarea"} />
            <TaskForm
                task={task}
                api_function={edit_task}
                tasksErrors={tasksErrors}
            />
        </Card>
    );
}

export default EditTask;
