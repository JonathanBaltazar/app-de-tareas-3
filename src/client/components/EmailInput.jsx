function EmailInput({
    name,
    placeholder,
    register,
    required = false,
    defaultValue = "",
}) {
    return (
        <input
            className="p-2 my-2 outline-none border border-neutral-400 rounded-md"
            type="email"
            placeholder={placeholder}
            {...register(name, {
                required: required,
            })}
            defaultValue={defaultValue}
        />
    );
}

export default EmailInput;
