import io from 'socket.io-client'
// import { toast } from 'react-toastify'

import { store } from '../redux/store'
import { t_loadUsers } from '../redux/tracks'
import { a_like, a_setTotalLikes } from '../redux/actions'

const { REACT_APP_SOCKET_SERVER, REACT_APP_SOCKET_PATH } = process.env

export let socket = null

export const connectToSocket = () => {
    socket = io(REACT_APP_SOCKET_SERVER, {
        path: REACT_APP_SOCKET_PATH,
        transports: ['websocket'],
        secure: true,
        query: {
            token: 'Bearer ' + localStorage.getItem('auth')
        }
    })
    if (socket) {
        socket.on('like', ({ user_id, image_id }) => {
            store.dispatch(a_like({ user_id, image_id }))
        })
        socket.on('update_total_likes', ({ totalLikes }) => {
            store.dispatch(a_setTotalLikes(totalLikes))
        })
        socket.on('update_admin_users', () => {
            const { is_admin } = store.getState().profile.data
            const users = store.getState().users.users
            if (is_admin && users) {
                const { page, limit } = users
                store.dispatch(t_loadUsers({ page, limit }))
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
        socket.on('server_error', msg => {
            console.log('server_error', msg)
        })
    }
}

export const disconnectFromSocket = () => {
    socket.disconnect()
}
