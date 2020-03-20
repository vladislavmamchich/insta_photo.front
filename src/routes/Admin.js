import React, { useEffect } from 'react'
import { Switch, Redirect } from 'react-router-dom'
// import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'

import { a_setIsAdmin } from '../redux/actions'

import PrivateRoute from '../components/service/PrivateRoute'
import Admin from '../screens/admin'
import AdminUserInfo from '../screens/admin/AdminUserInfo'

// const NotFound = lazy(() => import('../components/service/NotFound'))

const AdminRouter = props => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(store => store.service.isAdmin)
    const data = useSelector(store => store.profile.data)
    // componentDidMount() {
    //     const { loadProfile } = this.props
    //     loadProfile()
    // }
    useEffect(() => {
        dispatch(a_setIsAdmin(true))
        document.getElementById('root').style.backgroundColor = '#eee'
        return () => {
            dispatch(a_setIsAdmin(false))
            document.getElementById('root').style.backgroundColor = '#fc7168'
        }
    }, [dispatch, isAdmin])

    // const { data } = props
    if (data.is_admin) {
        return (
            <Switch>
                <PrivateRoute exact path="/admin" component={Admin} />
                <PrivateRoute
                    path="/admin/user/:id"
                    component={AdminUserInfo}
                />
            </Switch>
        )
    } else {
        return <Redirect to="/" />
    }
}

// const mapStateToProps = state => ({
//     service: state.service,
//     data: state.profile.data
// })

// const mapDispatchToProps = dispatch => ({
//     loadProfile: () => {
//         dispatch(t_loadProfile())
//     }
// })
export default AdminRouter
// export default connect(mapStateToProps, mapDispatchToProps)(AdminRouter)
