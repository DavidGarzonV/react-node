export const type = 'loginAction';

const loginAction = (isLogged: boolean) => {
    return{
        type,
        payload: isLogged
    }
}

export default loginAction;