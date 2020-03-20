import { toast } from 'react-toastify'

import sendRequest from '../utils/request'
import { socket } from '../utils/socket'
import * as paths from '../constants/api'
import * as acts from './actions'

export const t_subscribe = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_subscribe,
			method: 'post',
			success: res => {
				localStorage.setItem('auth', res.access_token)
				dispatch(acts.a_setProfile(res.data))
				dispatch(acts.a_setAuth(true))
				dispatch(
					acts.a_setModal({
						title: 'You are subscribed successfully',
						message: `Your nickname: ${res.data.nickname}, your password: ${res.password}`,
						outClickForbidden: true
					})
				)
				resolve()
			},
			failFunc: err => {
				toast.warn(err)
				reject()
			}
		})
	})
}
export const t_login = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_login,
			method: 'post',
			attr: payload,
			success: res => {
				localStorage.setItem('auth', res.access_token)
				dispatch(acts.a_setProfile(res.data))
				dispatch(acts.a_setAuth(true))
				resolve()
			},
			failFunc: err => {
				toast.warn(err.msg)
				reject()
			}
		})
	})
}
const t_uploadImages = ({ files, data }) => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_uploadImages,
			method: 'post',
			attr: files,
			success: res => {
				dispatch(acts.a_updateRotation({ reset: true }))
				dispatch(acts.a_updateRegisterPhoto({ reset: true }))
				const { nickname, password } = data
				dispatch(
					acts.a_setModal({
						title: res.msg,
						message: `Your nickname: ${nickname}, your password: ${password}.
						Try to log in through time`,
						outClickForbidden: true,
						onClick: () => window.location.assign('/login')
					})
				)
				localStorage.removeItem('auth')
				resolve()
			},
			failFunc: err => {
				toast.warn(err)
				localStorage.removeItem('auth')
				reject()
			}
		})
	})
}
export const t_register = ({ files, data }) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_register,
			method: 'post',
			attr: { data },
			success: async ({ access_token }) => {
				localStorage.setItem('auth', access_token)
				try {
					await dispatch(t_uploadImages({ files, data }))
					resolve()
				} catch (err) {
					reject()
				}

				// toast.success(res.msg)
				// dispatch(acts.a_updateRotation({ reset: true }))
				// dispatch(acts.a_updateRegisterPhoto({ reset: true }))
				// const { with_email, email, nickname, password } = JSON.parse(
				// 	payload.get('data')
				// )
				// dispatch(
				// 	acts.a_setModal({
				// 		title: res.msg,
				// 		message: `Your email/nickname: ${
				// 			with_email ? email : nickname
				// 		}, your password: ${password}.
				// 		${
				// 			with_email
				// 				? 'When the profile passes admin moderation, an alert will be sent to your email'
				// 				: 'Try to log in through time'
				// 		}`,
				// 		outClickForbidden: true,
				// 		onClick: () => window.location.assign('/login')
				// 	})
				// )
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}

				reject()
			}
		})
	})
}
export const t_resetPassword = payload => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_resetPassword,
			method: 'post',
			attr: payload,
			success: res => {
				toast.success(res.msg)
				resolve()
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}
				reject()
			}
		})
	})
}
export const t_loadCaptcha = () => dispatch => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_loadCaptcha,
			success: res => {
				dispatch(acts.a_setCaptcha(res.data))
				resolve()
			}
		})
	})
}
export const t_loadProfile = () => dispatch => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_profile,
			success: res => {
				dispatch(acts.a_setProfile(res.profile))
				resolve()
			}
		})
	})
}
export const t_loadUserInfo = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_getUser,
			method: 'post',
			attr: payload,
			success: res => {
				dispatch(acts.a_setUserInfo(res.user))
				resolve()
			},
			failFunc: err => reject(err)
		})
	})
}
export const t_loadUsers = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_getUsers,
			method: 'post',
			attr: payload,
			success: res => {
				dispatch(acts.a_setUsers(res))
				resolve()
			},
			failFunc: err => reject(err)
		})
	})
}
export const t_loadUser = payload => dispatch => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_loadUser + payload,
			success: res => {
				dispatch(acts.a_setUserInfo(res.user))
				resolve()
			}
		})
	})
}
export const t_userModeration = payload => dispatch => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_userModeration,
			method: 'patch',
			attr: payload,
			success: ({ msg }) => {
				toast.success(msg)
				dispatch(acts.a_setUserModeration(payload))
				resolve()
			}
		})
	})
}
export const t_activation = payload => (dispatch, getState) => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_activation,
			method: 'patch',
			attr: payload,
			success: ({ msg }) => {
				toast.success(msg)
				const { data } = getState().profile
				dispatch(
					acts.a_setProfile({ ...data, is_active: payload.is_active })
				)
				resolve()
			}
		})
	})
}
export const t_checkUniq = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_checkUniq,
			method: 'post',
			attr: payload,
			success: res => {
				if (res.uniq) resolve()
				reject()
			}
		})
	})
}
export const t_rotateImage = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_rotateImage,
			method: 'patch',
			attr: payload,
			success: res => {
				toast.success(res.msg)
				resolve()
			}
		})
	})
}
export const t_changeMainPhotoAdmin = ({ payload, image }) => (
	dispatch,
	getState
) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_changeMainPhotoAdmin,
			method: 'patch',
			attr: payload,
			success: res => {
				dispatch(
					acts.a_setUserInfo({
						...getState().users.user,
						main_photo: image
					})
				)
				toast.success(res.msg)
				resolve()
			}
		})
	})
}
export const t_deleteUserImage = payload => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_deleteUserImage,
			method: 'delete',
			attr: payload,
			success: res => {
				const { user } = getState().users
				dispatch(
					acts.a_setUserInfo({
						...user,
						images: user.images.filter(
							i => i._id !== payload.image_id
						)
					})
				)
				toast.success(res.msg)
				resolve()
			}
		})
	})
}
export const t_images = payload => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_images,
			method: 'post',
			attr: payload,
			success: ({ images, totalLikes }) => {
				dispatch(acts.a_setTotalLikes(totalLikes))
				dispatch(acts.a_pushUsersMainImages({ images }))
				resolve()
			}
		})
	})
}
// export const t_favourites = ({ image, index }) => (dispatch, getState) => {
// 	return new Promise((resolve, reject) => {
// 		sendRequest({
// 			r_path: paths.p_favourites,
// 			method: 'post',
// 			attr: { image_id: image._id },
// 			success: ({ new_favourites }) => {
// 				const {
// 					profile: { data },
// 					users: {
// 						images,
// 						filter: { showMe }
// 					}
// 				} = getState()
// 				console.log('index', index)
// 				const myFavouritesIndex = data.favourites.findIndex(
// 					i => i._id === image._id
// 				)
// 				index = showMe ? index - 1 : index
// 				const imagesFavouritesIndex = images.docs[
// 					index
// 				].favourites.indexOf(data._id)
// 				const isMyFavourites =
// 					myFavouritesIndex >= 0 && imagesFavouritesIndex >= 0
// 				if (!isMyFavourites && !image.likes.includes(data._id)) {
// 					socket.emit('like', { image_id: image._id })
// 				}
// 				dispatch(
// 					acts.a_updateFavourites({
// 						image_id: image._id,
// 						new_favourites,
// 						myFavouritesIndex,
// 						index,
// 						data,
// 						imagesFavouritesIndex
// 					})
// 				)
// 				resolve()
// 			}
// 		})
// 	})
// }
export const t_addToFavourites = ({ image }) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_favourites,
			method: 'post',
			attr: { image_id: image._id },
			success: res => {
				const {
					profile: { data }
				} = getState()
				if (!image.likes.includes(data._id)) {
					socket.emit('like', { image_id: image._id })
				}
				dispatch(
					acts.a_addToFavourites({
						image_id: image._id,
						data
					})
				)
				resolve()
			}
		})
	})
}
export const t_removeFromFavourites = ({ image }) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_favourites,
			method: 'post',
			attr: { image_id: image._id },
			success: res => {
				const {
					profile: { data }
				} = getState()
				dispatch(
					acts.a_removeFromFavourites({
						image_id: image._id,
						data
					})
				)
				resolve()
			}
		})
	})
}
export const t_changePassword = payload => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_password,
			method: 'patch',
			attr: payload,
			success: res => {
				toast.success(res.msg)
				const {
					profile: { data }
				} = getState()
				dispatch(
					acts.a_setProfile({ ...data, one_time_password: undefined })
				)
				resolve()
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}
				reject()
			}
		})
	})
}
export const t_favouritesFromPage = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_favouritesFromPage,
			method: 'post',
			attr: payload,
			success: ({ images }) => {
				// console.log(images)
				dispatch(acts.a_setFavourites({ images }))
				resolve()
			}
		})
	})
}
export const t_nickname = payload => dispatch => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_nickname,
			method: 'patch',
			attr: payload,
			success: ({ msg, profile }) => {
				toast.success(msg)
				dispatch(acts.a_setProfile(profile))
				resolve()
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}
			}
		})
	})
}
export const t_email = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_email,
			method: 'post',
			attr: payload,
			success: ({ msg }) => {
				toast.success(msg)
				// dispatch(acts.a_setProfile(profile))
				resolve()
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}
				reject()
			}
		})
	})
}
export const t_updateEmail = ({ emailToken, cb }) => dispatch => {
	// return new Promise(resolve => {
	sendRequest({
		r_path: paths.p_updateEmail,
		method: 'patch',
		attr: { emailToken },
		success: ({ msg, profile }) => {
			toast.success(msg)
			dispatch(acts.a_setProfile(profile))
			cb(profile.email)
		},
		failFunc: err => {
			if (err.msg) {
				toast.warn(err.msg)
			} else {
				toast.warn(JSON.stringify(err))
			}
		}
	})
	// })
}
// export const t_confirmEmail = payload => dispatch => {
// 	return new Promise(resolve => {
// 		sendRequest({
// 			r_path: paths.p_confirmEmail,
// 			method: 'post',
// 			attr: payload,
// 			success: ({ msg }) => {
// 				toast.success(msg)
// 			},
// 			failFunc: err => {
// 				if (err.msg) {
// 					toast.warn(err.msg)
// 				} else {
// 					toast.warn(JSON.stringify(err))
// 				}
// 			}
// 		})
// 	})
// }
export const t_allowShareEmail = payload => dispatch => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_allowShareEmail,
			method: 'patch',
			attr: payload,
			success: ({ msg, profile }) => {
				toast.success(msg)
				dispatch(acts.a_setProfile(profile))
				resolve()
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}
			}
		})
	})
}
export const t_changeSecretWord = payload => dispatch => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_secretWord,
			method: 'patch',
			attr: payload,
			success: ({ msg, profile }) => {
				toast.success(msg)
				dispatch(acts.a_setProfile(profile))
				resolve()
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}
			}
		})
	})
}
export const t_getGeo = payload => dispatch => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_getGeo,
			success: ({ countries, nationalities }) => {
				dispatch(acts.a_setGeo({ countries, nationalities }))
				resolve()
			}
		})
	})
}
export const t_registerParticipant = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_registerParticipant,
			method: 'post',
			attr: payload,
			success: ({ msg, profile }) => {
				dispatch(acts.a_setProfile(profile))
				resolve()
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}
				reject()
			}
		})
	})
}
export const t_emailRegister = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_emailRegister,
			method: 'post',
			attr: payload,
			success: ({ msg }) => {
				toast.success(msg)
				dispatch(acts.a_updateRotation({ reset: true }))
				dispatch(acts.a_updateRegisterPhoto({ reset: true }))
				resolve()
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}
				reject()
			}
		})
	})
}
export const t_emailRegisterConfirm = payload => dispatch => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_emailRegisterConfirm,
			method: 'post',
			attr: payload,
			success: async ({ msg, email, password }) => {
				dispatch(
					acts.a_setModal({
						title: msg,
						message: `Your email: ${email}, your password: ${password}.
						When the profile passes admin moderation, an alert will be sent to your email`,
						outClickForbidden: true,
						onClick: () => window.location.assign('/login')
					})
				)
				resolve()
			},
			failFunc: err => {
				if (err.msg) {
					toast.warn(err.msg)
				} else {
					toast.warn(JSON.stringify(err))
				}
				reject()
			}
		})
	})
}
