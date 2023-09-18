import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// COMPONENTS
import ErrorP from "../components/ErrorP";
import Button from "../components/Button";
import TextAreaInput from "../components/TextAreaInput";
import DateInput from "../components/DateInput";
import TextInput from "../components/TextInput";
import BoxErrors from "../components/BoxErrors";

// PROPS
// api_function: function, funcion que se ejecuta cuando se hace submit del formulario
// tasksErrors: array, errores del Backend

function TaskForm({ task = {}, api_function, tasksErrors }) {
    let defaultDate = dayjs(task.date);
    let formattedDate = defaultDate.format("YYYY-MM-DD");

    let navigate = useNavigate();

    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let onSubmit = async (data) => {
        let res = await api_function(data, task.task_id ? task.task_id : null);
        if (res) {
            navigate("/tasks");
        }
    };

    return (
        <div>
            <div>
                {tasksErrors.length > 0 &&
                    tasksErrors.map((error) => {
                        return <BoxErrors key={error} text={error} />;
                    })}
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name={"title"}
                    placeholder={"Titulo"}
                    register={register}
                    required={true}
                    defaultValue={task.title}
                />
                {errors.title && <ErrorP text={"El titulo es requerido"} />}
                <TextAreaInput
                    name={"description"}
                    placeholder={"Descripcion"}
                    register={register}
                    defaultValue={task.description}
                />
                <DateInput
                    name={"task_date"}
                    register={register}
                    defaultValue={formattedDate}
                />

                <Button type="submit" nameButton={"Guardar"} />
            </form>
        </div>
    );
}

export default TaskForm;
