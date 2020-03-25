import update from 'react-addons-update'
import i18next from 'i18next'
import { getNavigatorLanguage } from '../../utils/helpers'

const initialState = {
	data: null,
	language: localStorage.getItem('language') || getNavigatorLanguage(),
	favourites: null,
	heightUnit: localStorage.getItem('heightUnit') || 'cm',
	weightUnit: localStorage.getItem('weightUnit') || 'kg'
}

export default function profileReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case 'SET_PROFILE':
			return { ...state, data: payload }
		case 'SET_HEIGHT_UNIT':
			return { ...state, heightUnit: payload }
		case 'SET_WEIGHT_UNIT':
			return { ...state, weightUnit: payload }
		case 'SET_FAVOURITES':
			if (state.favourites) {
				if (state.favourites.page < payload.images.page) {
					return {
						...state,
						favourites: {
							...payload.images,
							docs: [
								...state.favourites.docs,
								...payload.images.docs
							]
						}
					}
				} else {
					return {
						...state,
						favourites: payload.images
					}
				}
			} else {
				return {
					...state,
					favourites: payload.images
				}
			}
		case 'SET_LANGUAGE':
			localStorage.setItem('language', payload)
			i18next.changeLanguage(payload)
			return { ...state, language: payload }
		case 'LIKE':
			if (state.data) {
				const { images } = state.data
				const img_ind = images.findIndex(
					i => i._id === payload.image_id
				)
				if (img_ind >= 0) {
					const user_ind = images[img_ind].likes.findIndex(
						u => u === payload.user_id
					)
					const queryLikes =
						user_ind >= 0
							? { $splice: [[user_ind, 1]] }
							: { $push: [payload.user_id] }
					return {
						...state,
						data: update(state.data, {
							images: {
								[img_ind]: {
									likes: queryLikes,
									totalLikes: {
										$set:
											user_ind >= 0
												? images[img_ind].totalLikes - 1
												: images[img_ind].totalLikes + 1
									}
								}
							}
						})
					}
				}
			}
			return state
		case 'ADD_TO_FAVOURITES':
			return {
				...state,
				data: update(state.data, {
					favourites: { $push: [payload.image_id] }
				})
			}
		case 'REMOVE_FROM_FAVOURITES':
			let { favourites } = state
			let filtered = state.data.favourites.filter(
				i => i !== payload.image_id
			)
			favourites = favourites
				? {
						...favourites,
						docs: favourites.docs.filter(
							i => i._id !== payload.image_id
						)
				  }
				: favourites
			return {
				...state,
				data: update(state.data, {
					favourites: { $set: filtered }
				}),
				favourites
			}

		default:
			return state
	}
}
