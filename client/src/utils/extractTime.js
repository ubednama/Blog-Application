export function extractTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const paddedHours = padZero(hours);
    const minutes = padZero(date.getMinutes());
    return `${paddedHours}:${minutes} ${ampm}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}

//2024-02-12T22:18:17.114Z

export const formatTime = (dateString) => {
    const publishedDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - publishedDate.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (minutesDifference <= 1) {
        return 'just now';
    } else if (minutesDifference < 60) {
        return `${minutesDifference} ${minutesDifference === 1 ? 'min' : 'mins'} ago`;
    } else if (hoursDifference < 24) {
        const formattedTime = publishedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
        return formattedTime;
    } else if (hoursDifference < 48) {
        return 'Yesterday';
    } else if (daysDifference < 7) {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return weekdays[publishedDate.getDay()];
    } else if (daysDifference < 365) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${publishedDate.getDate()} ${months[publishedDate.getMonth()]}`;
    } else {
        const month = publishedDate.getMonth() + 1;
        const year = publishedDate.getFullYear();
        return `${month}/${publishedDate.getDate()}/${year}`;
    }
};

export const formatTimeInterval = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const msInDay = 1000 * 60 * 60 * 24;
    const msInWeek = msInDay * 7;
    const msInYear = msInDay * 365;

    const timeDifference = endDate - startDate;
    const daysDifference = Math.floor(timeDifference / msInDay);

    if (daysDifference === 0) {
        return "Today";
    } else if (daysDifference === 1) {
        return "Yesterday";
    } else if (timeDifference < msInWeek) {
        return startDate.toLocaleDateString("en-US", { weekday: "long" });
    } else if (timeDifference < msInYear) {
        return startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else {
        return startDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
};