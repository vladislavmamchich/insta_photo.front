const initialState = {
	loading: null,
	modal: null,
	auth: localStorage.getItem('auth') !== null,
	error: false
}

export default function serviceReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case 'SET_AUTH':
			return { ...state, auth: payload }
		case 'SET_ERROR':
			return { ...state, error: payload }
		case 'SET_LOADING':
			return { ...state, loading: payload }
		case 'SET_MODAL':
			return { ...state, modal: payload }

		default:
			return state
	}
}
