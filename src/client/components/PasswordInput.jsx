import { GoEye, GoEyeClosed } from "react-icons/go";
import { useState } from "react";

function PasswordInput({ name, placeholder, register, required = false }) {
    const [show, setShow] = useState(false);

    return (
        <div className="flex">
            <input
                className="p-2 my-2 outline-none border border-l-neutral-400 border-t-neutral-400 border-b-neutral-400 rounded-l-md flex-grow"
                type={show ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                {...register(name, {
                    required: required,
                })}
            />
            <button
                type="button"
                className="py-2 px-4 my-2 border border-neutral-400  rounded-r-md"
                onClick={() => {
                    setShow(!show);
                }}
            >
                {show ? <GoEye /> : <GoEyeClosed />}
            </button>
        </div>
    );
}

export default PasswordInput;
