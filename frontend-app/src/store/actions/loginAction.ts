export const type = 'loginAction';

const loginAction = (isLogin: boolean) => {
    return{
        type,
        payload: isLogin
    }
}

export default loginAction;