export const requiredCreator = (name) => (value) => {
    if (value) return undefined
    return `${name} should not be empty`
}


export const isEmail = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined