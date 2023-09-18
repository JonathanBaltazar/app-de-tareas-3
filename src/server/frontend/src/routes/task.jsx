import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button, Checkbox } from "@chakra-ui/react";
import { GoTrash, GoPencil } from "react-icons/go";
import dayjs from "dayjs";

// LOCAL
import { getTask } from "../api/tasks";
import { TasksContext } from "../context/TasksContext";

// COMPONENTS
import Card from "../components/Card";
import Title from "../components/Title";
import DynamicLink from "../components/DynamicLink";
import Paragraph from "../components/Paragraph";

export let loader = async ({ params }) => {
    try {
        let res = await getTask(params.id);
        let task = res.data.task;
        return task;
    } catch (error) {
        console.log(error);
        return null;
    }
};

function Task() {
    let { delete_task, changeTaskState } = useContext(TasksContext);
    let navigate = useNavigate();
    let task = useLoaderData();

    let defaultDate = dayjs(task.date);
    let formattedDate = defaultDate.format("YYYY-MM-DD");

    return (
        <>
            {/* <ProfileMenu /> */}
            <Card id="card">
                <div className="flex justify-between items-center">
                    <Title titleName={task.title} align_left={true} />
                    <Checkbox
                        colorScheme="blue"
                        defaultChecked={task.state == 0 ? false : true}
                        size={"lg"}
                        onChange={(e) => {
                            let done = e.target.checked;
                            changeTaskState(task.task_id, done);
                        }}
                        className="border border-neutral-400 rounded-sm"
                    />
                </div>
                <div className="max-h-96 my-2 overflow-y-auto-auto sm:bg-neutral-50 sm:dark:bg-neutral-500 sm:p-2 sm:rounded-md">
                    <Paragraph
                        text={
                            !task.description ? (
                                <span className="text-neutral-500">
                                    Sin descripción
                                </span>
                            ) : (
                                task.description
                            )
                        }
                    />
                </div>
                <Paragraph text={`Fecha: ${formattedDate}`} />
                <div className="flex gap-2 my-2">
                    <button
                        className={`px-4 py-2 my-2 bg-red-500 text-white rounded-md text-center text-xl`}
                        onClick={() => {
                            delete_task(task.task_id);
                            navigate("/tasks");
                        }}
                    >
                        <GoTrash />
                    </button>
                    <Link
                        className={`px-4 py-2 my-2 bg-green-500 text-xl text-white rounded-md text-center`}
                        to={`/edit-task/${task.task_id}`}
                    >
                        <GoPencil />
                    </Link>
                </div>
                <DynamicLink to="/tasks" name={"Regresar"} />
            </Card>
        </>
    );
}

export default Task;
