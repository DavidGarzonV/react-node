export const validateSuccessType = 'validateSuccess';
export const validatingType = 'validating';
export const validateFailedType = 'validateFailed';


export const validating = () => {
	return {
		type: validatingType
	}
}

export const validateSuccess = (status: boolean) => {
	return {
		type: validateSuccessType,
		payload: status
	}
}
 const validateFailed = (failed: boolean) => {
	return {
		type: validateFailedType,
		payload: failed
	}
}