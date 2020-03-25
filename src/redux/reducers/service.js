import update from 'react-addons-update'

const initialState = {
	loading: null,
	modal: null,
	// modal: { title: 'qwe', outClickForbidden: true },
	auth: localStorage.getItem('auth') !== null,
	error: false,
	isAdmin: false,
	registerPhotos: [],
	rotations: Array.from(Array(5).fill(0)),
	captcha: null
}

export default function serviceReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case 'SET_AUTH':
			return { ...state, auth: payload }
		case 'SET_CAPTCHA':
			return { ...state, captcha: payload }
		case 'SET_ERROR':
			return { ...state, error: payload }
		case 'SET_LOADING':
			return { ...state, loading: payload }
		case 'SET_MODAL':
			return { ...state, modal: payload }
		case 'SET_IS_ADMIN':
			return { ...state, isAdmin: payload }
		case 'UPDATE_REGISTER_PHOTO':
			const newRegisterPhotos = payload.reset
				? []
				: update(state.registerPhotos, {
						[payload.index]: { $set: payload.value }
				  })
			return { ...state, registerPhotos: newRegisterPhotos }
		case 'DELETE_REGISTER_PHOTO':
			let registerPhotos = [...state.registerPhotos]
			registerPhotos.splice(payload, 1)
			return {
				...state,
				registerPhotos
			}
		case 'UPDATE_ROTATION':
			const newRotations = payload.reset
				? Array.from(Array(5).fill(0))
				: update(state.rotations, {
						[payload.index]: { $set: payload.value }
				  })
			return { ...state, rotations: newRotations }

		default:
			return state
	}
}
