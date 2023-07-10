export const daysToSeconds = (days: number) => {
    return days * 24 * 60 * 60
}

export const daysToMilliseconds = (days: number) => {
    return daysToSeconds(days) * 1000
}
