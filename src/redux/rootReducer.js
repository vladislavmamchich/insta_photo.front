import { combineReducers } from 'redux'

import service from './reducers/service'
import profile from './reducers/profile'
export default combineReducers({
	service,
	profile
})
