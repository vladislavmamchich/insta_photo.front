// import update from 'react-addons-update'
// import { languages } from '../../constants'

const initialState = {
	data: null,
	language: null
}

export default function profileReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case 'SET_PROFILE':
			return { ...state, data: payload }
		case 'SET_LANGUAGE':
			return { ...state, language: payload }

		default:
			return state
	}
}
