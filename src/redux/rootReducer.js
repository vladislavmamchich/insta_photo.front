import { combineReducers } from 'redux'

import service from './reducers/service'
import profile from './reducers/profile'
import users from './reducers/users'
export default combineReducers({
	service,
	profile,
	users
})
