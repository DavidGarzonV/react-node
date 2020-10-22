export const type = 'loadingAction';

const loadingAction = (loading: boolean) => {
    return{
        type,
        payload: loading
    }
}

export default loadingAction;