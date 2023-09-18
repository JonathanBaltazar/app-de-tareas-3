function TextInput({
    name,
    placeholder,
    register,
    required = false,
    defaultValue = "",
}) {
    return (
        <input
            className="p-2 my-2 outline-none border border-neutral-400 rounded-md"
            type="text"
            placeholder={placeholder}
            {...register(name, {
                required: required,
            })}
            defaultValue={defaultValue}
        />
    );
}

export default TextInput;
