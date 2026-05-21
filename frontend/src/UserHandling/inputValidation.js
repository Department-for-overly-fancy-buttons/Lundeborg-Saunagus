
export function validateEmail(username) {
    console.log("validating")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !emailRegex.test(username)
}

export function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    return !passwordRegex.test(password) || password.length < 8
}

export function validateName(name) {
    const nameRegex = /^[a-zA-ZæøåÆØÅ](?!.*--)(?!.*\s{2})[a-zA-ZæøåÆØÅ\s-]{0,98}[a-zA-ZææøåÆØÅ]$/i;
    return !nameRegex.test(name);
}

export function validateDigitsOnly(input){
    const digitsOnlyPattern = /^\d+$/;
    return !digitsOnlyPattern.test(input);
}