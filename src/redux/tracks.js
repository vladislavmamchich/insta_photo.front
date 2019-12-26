import { toast } from 'react-toastify'

import sendRequest from '../utils/request'
// import { connectToSocket, socket } from '../utils/socket'
import * as paths from '../constants/api'
import * as acts from './actions'

export const t_login = payload => dispatch => {
	return new Promise(resolve => {
		// sendRequest({
		// 	r_path: paths.p_login,
		// 	method: 'post',
		// 	attr: payload,
		// 	success: res => {
		// localStorage.setItem('auth', res.access_token)
		// dispatch(acts.a_setProfile(res.data))
		dispatch(acts.a_setAuth(true))
		// toast.success(res.msg)
		resolve()
		// 	},
		// 	failFunc: err => {
		// 		toast.error(err)
		// 		resolve()
		// 	}
		// })
	})
}
export const t_register = ({ payload, fail }) => (dispatch, getState) => {
	sendRequest({
		r_path: paths.p_register,
		method: 'post',
		attr: payload,
		success: res => {
			dispatch(acts.a_setLoading(null))
			localStorage.removeItem('phone_number')
			toast.success(res.msg)
		},
		failFunc: err => {
			dispatch(acts.a_setLoading(null))
			fail(err)
		}
	})
}
export const t_restorePass = ({ payload, success, fail }) => (
	dispatch,
	getState
) => {
	sendRequest({
		r_path: paths.p_restore_password,
		method: 'post',
		attr: payload,
		success: res => {
			dispatch(acts.a_setLoading(null))
			localStorage.removeItem('phone_number')
			localStorage.removeItem('restore_step')
			toast.success(res.msg)
			success()
		},
		failFunc: err => {
			dispatch(acts.a_setLoading(null))
			fail(err)
		}
	})
}
