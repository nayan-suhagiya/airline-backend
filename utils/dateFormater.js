const UtcToLocal = (date) => {
    const utcDate = new Date(date);
    const timezoneOffsetMs = utcDate.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000) + timezoneOffsetMs); 
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const formattedDate = formatter.format(localDate);
    return formattedDate;
}

const getDateOnly = (date) => {
    const utcDate = new Date(date);
    const timezoneOffsetMs = utcDate.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(utcDate.getTime() - timezoneOffsetMs + (5.5 * 60 * 60 * 1000));
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    const formattedDate = formatter.format(localDate);
    return formattedDate;
}

const getDateInFormate = (date) => {
    console.log("date 111 >>>>",date)
    const [month, day, year] = date.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;  
    console.log("formattedDate >>>>",formattedDate)
    return formattedDate;
}

export default {UtcToLocal,getDateOnly,getDateInFormate};
