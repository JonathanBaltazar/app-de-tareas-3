function DateInput({ name, register, defaultValue = "" }) {
    return (
        <>
            <label htmlFor="date-input" className="font-medium">
                Fecha:
            </label>
            <input
                id="date-input"
                className="p-2 my-2 outline-none border border-neutral-400 rounded-md"
                type="date"
                name="task_date"
                defaultValue={defaultValue}
                {...register(name)}
            />
        </>
    );
}

export default DateInput;
