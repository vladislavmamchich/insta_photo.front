// import { languages } from '../../constants'

const initialState = {
	language: null,
	contacts: [],
	task_performers: [],
	new_task: {
		name: '',
		description: '',
		date: null,
		time: null
	},
	selectedTasksUser: null,
	online_users: [],
	edited_task: {
		empty: true,
		name: '',
		description: '',
		date: null,
		time: null
	},
	users_from_role_position: { users: [], company: null }
}

export default function profileReducer(
	state = initialState,
	{ type, payload }
) {
	let user, task_performers, taskType, index
	switch (type) {
		case 'SET_PROFILE':
			return { ...state, ...payload }
		case 'SET_LANGUAGE':
			return { ...state, language: payload }
		case 'SET_CONTACTS':
			return { ...state, ...payload }
		case 'SET_USERS_FROM_ROLE_OR_POSITION':
			return { ...state, users_from_role_position: payload }
		case 'UPDATE_USER_IMAGE':
			user = { ...state.user }
			user.image = payload
			return { ...state, user }
		case 'SET_SETTINGS':
			user = { ...state.user }
			user.settings = { ...user.settings, ...payload }
			return { ...state, user }
		case 'SET_NOTIFICATIONS':
			user = { ...state.user }
			user.settings = { ...user.settings, notifications: payload }
			return { ...state, user }
		case 'SET_ALL_USERS':
			return { ...state, contacts: payload }
		case 'SET_TASK_PERFORMERS':
			if (payload !== null) {
				if (payload instanceof Array) {
					task_performers = [...payload]
				} else {
					task_performers = [...state.task_performers]
					if (task_performers.includes(payload)) {
						task_performers = task_performers.filter(
							p => p !== payload
						)
					} else {
						// task_performers.push(payload)
						task_performers = [payload]
					}
				}
			} else {
				task_performers = []
			}
			return { ...state, task_performers }
		case 'SET_NEW_TASK':
			return { ...state, new_task: payload }
		case 'SET_EDITED_TASK':
			return { ...state, edited_task: payload }
		case 'SET_SELECTED_TASKS_USER':
			return { ...state, selectedTasksUser: payload }
		case 'SET_ONLINE_USERS':
			return { ...state, online_users: payload }
		case 'UPDATE_TASK':
			user = { ...state.user }
			taskType = payload.iCreator ? 'created_tasks' : 'tasks'
			index = user[taskType].findIndex(t => t._id === payload.task._id)
			user[taskType].splice(index, 1, payload.task)
			if (state.selectedTasksUser) {
				var selectedTasksUser = { ...state.selectedTasksUser }
				let ind1 = selectedTasksUser[taskType].findIndex(
					t => t._id === payload.task._id
				)
				let ind2 = selectedTasksUser.tasks_list.findIndex(
					t => t._id === payload.task._id
				)
				selectedTasksUser[taskType].splice(ind1, 1, payload.task)
				selectedTasksUser.tasks_list.splice(ind2, 1, payload.task)
			}
			return {
				...state,
				user,
				edited_task: { ...state.edited_task, empty: true },
				selectedTasksUser
			}
		case 'DELETE_TASK':
			user = { ...state.user }
			taskType = payload.iCreator ? 'created_tasks' : 'tasks'
			index = user[taskType].findIndex(t => t._id === payload._id)
			user[taskType].splice(index, 1)
			return { ...state, user }
		case 'SET_USER_COMPANY':
			user = { ...state.user }
			user.company = payload.company
			user.department = payload.department
			user.created_tasks = payload.created_tasks
			user.tasks = payload.tasks
			return { ...state, user }

		default:
			return state
	}
}
