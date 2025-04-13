// standaard validatie voor onze inputs

export function handleUserInput(target, min, max) {
    if (/^[a-zA-Z0-9\s]*$/.test(target)) {
        return target.length > min && target.length < max;
    } else {
        return false;
    }
}

export function handleEmailInput(target, min, max) {
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(target)) {
        return target.length > min && target.length < max;
    } else {
        return false;
    }
}

export function handlePasswordInput(target, passwordCheck) {
    const passwordInput = [false, false];
    if (/^[a-zA-Z0-9\s]*$/.test(target)) {
        passwordInput[0] = target.length > 5 && target.length < 16;
    } else {
        passwordInput[0] = false;
    }

    if (target === "") {
        passwordInput[1] = false;
    } else passwordInput[1] = target === passwordCheck;
    return passwordInput;
}

export function handlePasswordChecker(target, password) {
    if (target === "") {
        return false;
    } else if (password === target) {
        return true;
    } else if (password !== target) {
        return false
    }
}