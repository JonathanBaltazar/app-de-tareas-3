import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../context/TasksContext";
import { Link, useNavigation } from "react-router-dom";
import { GoPlus } from "react-icons/go";

// COMPONENTS
import Card from "../components/Card";
import TaskCard from "../components/TaskCard";
import Button from "../components/Button";

function Tasks() {
    let navigation = useNavigation();

    let { tasks, getAllTasks, delete_tasks, setTasks } =
        useContext(TasksContext);

    const [showTasksCompleted, setShowTasksCompleted] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);

    useEffect(() => {
        getAllTasks();
    }, []);

    useEffect(() => {
        setPendingTasks(tasks.filter((task) => task.state == 0));
        setCompletedTasks(tasks.filter((task) => task.state == 1));
    }, [tasks]);

    return (
        <Card page={"tasks"}>
            <div className="flex justify-between items-center my-4">
                <div className="px-1 sm:px-2">
                    <div className="mb-3 sm:mb-0">
                        <button
                            className={`${
                                !showTasksCompleted ? "underline" : ""
                            } font-medium mr-4`}
                            onClick={() => {
                                setShowTasksCompleted(false);
                            }}
                        >
                            Pendientes
                        </button>
                        <button
                            className={`${
                                showTasksCompleted ? "underline" : ""
                            } font-medium mr-4`}
                            onClick={() => {
                                setShowTasksCompleted(true);
                            }}
                        >
                            Hechas
                        </button>
                    </div>
                    {showTasksCompleted && completedTasks.length > 0 && (
                        <button
                            className={`px-3 py-1 my-2 bg-red-500 text-white rounded-md text-center`}
                            onClick={() => {
                                completedTasks.map((task) =>
                                    delete_tasks(task.task_id)
                                );
                                setTasks(
                                    tasks.filter((task) => task.state == 0)
                                );
                            }}
                        >
                            Limpiar tareas
                        </button>
                    )}
                </div>
                <div>
                    <Link
                        to={"/new-task"}
                        className="p-2 text-white bg-neutral-800 inline-block rounded-full text-4xl shadow-lg"
                    >
                        <GoPlus />
                    </Link>
                </div>
            </div>

            {/* TAREAS PENDIENTES */}
            {!showTasksCompleted && (
                <ul className={`max-h-96 overflow-y-auto`}>
                    {pendingTasks.length == 0 ? (
                        <p className="font-medium text-neutral-600">
                            No hay tareas pendientes
                        </p>
                    ) : (
                        pendingTasks.map((task) => (
                            <li key={task.task_id}>
                                <TaskCard task={task} />
                            </li>
                        ))
                    )}
                </ul>
            )}

            {/* COMPLETADAS */}

            {showTasksCompleted && (
                <ul className="max-h-96 overflow-y-auto">
                    {completedTasks.length == 0 ? (
                        <p className="font-medium text-neutral-600">
                            No hay tareas hechas
                        </p>
                    ) : (
                        completedTasks.map((task) => (
                            <li key={task.task_id}>
                                <TaskCard task={task} />
                            </li>
                        ))
                    )}
                </ul>
            )}
        </Card>
    );
}

export default Tasks;
