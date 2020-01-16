import { toast } from 'react-toastify'

import sendRequest from '../utils/request'
// import { connectToSocket, socket } from '../utils/socket'
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
export const t_register = payload => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_register,
			method: 'post',
			attr: payload,
			success: res => {
				toast.success(res.msg)
				dispatch(acts.a_updateRotation({ reset: true }))
				dispatch(acts.a_updateRegisterPhoto({ reset: true }))
				resolve()
			},
			failFunc: err => {
				toast.warn(err.msg)
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
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_getUser,
			method: 'post',
			attr: payload,
			success: res => {
				dispatch(acts.a_setUserInfo(res.user))
				resolve()
			}
		})
	})
}
export const t_loadUsers = payload => dispatch => {
	return new Promise(resolve => {
		sendRequest({
			r_path: paths.p_getUsers,
			method: 'post',
			attr: payload,
			success: res => {
				dispatch(acts.a_setUsers(res))
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
export const t_changeMainPhotoAdmin = payload => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		sendRequest({
			r_path: paths.p_changeMainPhotoAdmin,
			method: 'patch',
			attr: payload,
			success: res => {
				dispatch(
					acts.a_setUserInfo({
						...getState().users.user,
						main_photo: payload.main_photo
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
