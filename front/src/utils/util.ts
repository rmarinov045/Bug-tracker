// generates IDs for DB => move to another module
export function generateTaskId() {
    return (Date.now()).toString() // placeholder ID generation
}

// generates creation time => add once ID placeholder is gone

// converts ms to date

export const convertToDate = (milisecs :string) :string => {
    return (new Date(Number(milisecs))).toString()
}