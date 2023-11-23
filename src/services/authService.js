export function setLocalStorage() {
    localStorage.setItem('isAuth', true);
}

export function unsetLocalStorage() {
    localStorage.removeItem('isAuth');
}

export function getLocalStorage() {
    if(localStorage.getItem('isAuth')) {
        return localStorage.getItem('isAuth');
    }
    return false;
}