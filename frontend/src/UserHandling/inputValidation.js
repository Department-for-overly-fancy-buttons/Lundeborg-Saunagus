
export function ValidateEmail(username) {

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return !emailRegex.test(username)

}