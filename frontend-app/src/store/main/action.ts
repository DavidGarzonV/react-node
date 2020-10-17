
const logoutAction = (isLogged:boolean) => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    return {
        type: 'LOGOUT',
        payload: isLogged
    }
}

export default logoutAction;