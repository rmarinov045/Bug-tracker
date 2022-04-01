// generates IDs for DB => move to another module
export function generateTaskId() {
    return (Date.now()).toString() // placeholder ID generation
}

// generates creation time => add once ID placeholder is gone

// converts ms to date

export const convertToDate = (milisecs :string) :string => {
    const date =  new Date(Number(milisecs))
    return `${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}-${date.getMonth() - 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}-${date.getFullYear()}`
}