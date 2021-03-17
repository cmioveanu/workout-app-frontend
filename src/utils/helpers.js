//convert date from database string to a better display format
export const dateConverter = (routineDate) => {
    const monthsArray = [null, "January", "February", "March", "April",
        "May", "June", "July", "August", "September", "November", "December"];

    const year = routineDate.slice(0, 4);
    const day = routineDate.slice(8, 10);

    let month = routineDate.slice(5, 7);
    if (month.charAt(0) === "0") month = month.charAt(1);
    month = monthsArray[month];

    return `${day} ${month} ${year}`;
}