// import { languages } from '../../constants'
import update from 'react-addons-update'

const initialState = {
	all: null,
	user: null,
	users: null
}

export default function usersReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_ALL_USERS':
			return { ...state, all: payload }
		case 'SET_USERS':
			return { ...state, users: payload }
		case 'SET_USER_INFO':
			return { ...state, user: payload }
		case 'SET_USER_ACTIVATION':
			return {
				...state,
				user: update(state.user, {
					is_active: { $set: payload.is_active }
				})
			}
		case 'UPDATE_USER_IMAGE':
			return {
				...state,
				user: update(state.user, {
					images: { [payload.index]: { $set: payload.image } }
				})
			}
		default:
			return state
	}
}
