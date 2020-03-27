import update from 'react-addons-update'

const initialFilter = {
	showMe: false,
	showFavourites: false,
	sort: 'created_at',
	country: '',
	region: '',
	nationality: '',
	age: '',
	order: -1
}

const initialState = {
	all: null,
	user: null,
	users: null,
	images: null,
	filter: initialFilter,
	modalUser: null,
	totalLikes: null,
	countries: null,
	nationalities: null
}

export default function usersReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_ALL_USERS':
			return { ...state, all: payload }
		case 'PUSH_USERS_MAIN_IMAGES':
			if (state.images) {
				if (state.images.page < payload.images.page) {
					return {
						...state,
						images: {
							...payload.images,
							docs: [...state.images.docs, ...payload.images.docs]
						}
					}
				} else {
					return {
						...state,
						images: payload.images
					}
				}
			} else {
				return {
					...state,
					images: payload.images
				}
			}
		case 'SET_USERS':
			return { ...state, users: payload }
		case 'SET_USER_INFO':
			return { ...state, user: payload }
		case 'SET_USER_MODERATION':
			return {
				...state,
				user: update(state.user, {
					moderated: { $set: payload.moderated }
				})
			}
		case 'UPDATE_USER_IMAGE':
			return {
				...state,
				user: update(state.user, {
					images: { [payload.index]: { $set: payload.image } }
				})
			}
		case 'LIKE':
			if (state.images) {
				const { docs } = state.images
				let { image_id, user_id } = payload
				const img_ind = docs.findIndex(i => i._id === image_id)
				if (img_ind >= 0) {
					const user_ind = docs[img_ind].likes.findIndex(
						u => u === user_id
					)
					const queryLikes =
						user_ind >= 0
							? { $splice: [[user_ind, 1]] }
							: { $push: [user_id] }
					return {
						...state,
						images: update(state.images, {
							docs: {
								[img_ind]: {
									likes: queryLikes,
									totalLikes: {
										$set:
											user_ind >= 0
												? docs[img_ind].totalLikes - 1
												: docs[img_ind].totalLikes + 1
									}
								}
							}
						})
					}
				}
			}
			return state
		// case 'ADD_TO_FAVOURITES':
		// 	if (state.images) {
		// 		let {
		// 			data: { _id },
		// 			image_id
		// 		} = payload
		// 		const index = state.images.docs.findIndex(
		// 			i => i._id === image_id
		// 		)
		// 		if (index >= 0) {
		// 			return {
		// 				...state,
		// 				images: update(state.images, {
		// 					docs: { [index]: { favourites: { $push: [_id] } } }
		// 				})
		// 			}
		// 		}
		// 	}
		// 	return state
		// case 'REMOVE_FROM_FAVOURITES':
		// 	if (state.images) {
		// 		let {
		// 			data: { _id },
		// 			image_id
		// 		} = payload
		// 		let { docs } = state.images
		// 		const index = docs.findIndex(i => i._id === image_id)
		// 		if (index >= 0) {
		// 			const favourites = docs[index].favourites.filter(
		// 				i => i !== _id
		// 			)
		// 			return {
		// 				...state,
		// 				images: update(state.images, {
		// 					docs: {
		// 						[index]: {
		// 							favourites: { $set: favourites }
		// 						}
		// 					}
		// 				})
		// 			}
		// 		}
		// 	}
		// 	return state
		case 'SET_FILTER':
			let { field, value } = payload
			return {
				...state,
				filter: { ...state.filter, [field]: value }
			}
		case 'CLEAR_FILTER':
			return {
				...state,
				filter: initialFilter
			}
		case 'SET_MODAL_USER':
			return { ...state, modalUser: payload }
		case 'SET_GEO':
			const { countries, nationalities } = payload
			return {
				...state,
				countries,
				nationalities
			}
		case 'CLEAR_MAIN_IMAGES':
			return { ...state, images: null }
		case 'SET_TOTAL_LIKES':
			return { ...state, totalLikes: payload }
		default:
			return state
	}
}
