import { useContext } from "react";
import { Link } from "react-router-dom";
import {
    Checkbox,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { FaEllipsisVertical } from "react-icons/fa6";

// LOCAL
import { TasksContext } from "../context/TasksContext";

function TaskCard({ task }) {
    let { changeTaskState, delete_task } = useContext(TasksContext);

    return (
        <div className="bg-white py-4 pl-2 pr-3 sm:pr-4 rounded-md border border-neutral-300 flex justify-between items-center mb-4 ">
            {/* LEFT SIDE */}
            <div className="flex items-center w-11/12">
                <Checkbox
                    colorScheme="blue"
                    defaultChecked={task.state == 0 ? false : true}
                    size={"lg"}
                    onChange={(e) => {
                        let done = e.target.checked;
                        changeTaskState(task.task_id, done);
                    }}
                />
                <Link
                    to={`/task/${task.task_id}`}
                    className="text-lg font-medium ml-4"
                >
                    {task.title}
                </Link>
            </div>
            {/* RIGHT SIDE  */}
            <Menu>
                <MenuButton>
                    <FaEllipsisVertical />
                </MenuButton>
                <MenuList>
                    <Link to={`/task/${task.task_id}`}>
                        <MenuItem>Abrir</MenuItem>
                    </Link>
                    <MenuItem
                        onClick={() => {
                            delete_task(task.task_id);
                        }}
                    >
                        Eliminar
                    </MenuItem>
                    <Link to={`/edit-task/${task.task_id}`}>
                        <MenuItem>Editar</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </div>
    );
}

export default TaskCard;
