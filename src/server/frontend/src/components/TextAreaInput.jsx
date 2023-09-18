function TextAreaInput({ name, placeholder, register, defaultValue = "" }) {
    return (
        <textarea
            className="p-2 my-2 outline-none border max-h-96 overflow-y-auto border-neutral-400 rounded-md"
            {...register(name)}
            placeholder={placeholder}
            defaultValue={defaultValue}
        ></textarea>
    );
}

export default TextAreaInput;
