let genDate = () => {
    let newDate = new Date();
    let monthDay = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    monthDay = monthDay < 10 ? `0${monthDay}` : monthDay;
    month = month < 10 ? `0${month}` : month;

    // yyyy-mm-dd
    let date = `${year}-${month}-${monthDay}`;
    return date;
};

export default genDate;
