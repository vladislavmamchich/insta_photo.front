import io from 'socket.io-client'
// import { toast } from 'react-toastify'

import { store } from '../redux/store'
import { t_loadUsers } from '../redux/tracks'

const { REACT_APP_SOCKET_SERVER, REACT_APP_SOCKET_PATH } = process.env

export let socket = null

export const connectToSocket = () => {
    socket = io(REACT_APP_SOCKET_SERVER, {
        path: REACT_APP_SOCKET_PATH,
        transports: ['polling'],
        secure: true,
        query: {
            token: 'Bearer ' + localStorage.getItem('auth')
        }
    })
    if (socket) {
        // const { _id } = store.getState().profile.user
        socket.on('admin_update_users', () => {
            const { users } = store.getState().users
            if (users) {
                store.dispatch(
                    t_loadUsers({ page: users.page, limit: users.limit })
                )
            }
        })
        socket.on('disconnect', reason => {
            console.log(reason)
            if (reason === 'io server disconnect') {
                socket.connect()
            }
        })
        socket.on('connect', () => {
            console.log('connect')
        })
    }
}

export const disconnectFromSocket = () => {
    socket.disconnect()
}
