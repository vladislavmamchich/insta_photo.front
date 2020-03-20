import React, { lazy, PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { a_setIsAdmin } from '../redux/actions'
import { t_loadProfile } from '../redux/tracks'

import Header from '../components/Header'
import Navs from '../components/Navs'

import PrivateRoute from '../components/service/PrivateRoute'
import Loader from '../components/service/Loader'

import Terms from '../screens/Terms'
import Privacy from '../screens/Privacy'
import Main from '../screens/Main'
import Profile from '../screens/Profile'
import Donate from '../screens/Donate'
import User from '../screens/User'
// import Admin from '../screens/admin'
// import AdminUserInfo from '../screens/admin/AdminUserInfo'
import Admin from './Admin'

const NotFound = lazy(() => import('../components/service/NotFound'))

class Personal extends PureComponent {
    componentDidMount() {
        const { loadProfile, setIsAdmin } = this.props
        loadProfile()
        setIsAdmin(false)
        document.getElementById('root').style.backgroundColor = '#fc7168'
    }

    render() {
        const {
            service: { isAdmin },
            data
        } = this.props
        return (
            <div>
                {!isAdmin && <Header />}
                <main className="px-2 px-lg-5 container">
                    {!isAdmin && <Navs />}
                    {data ? (
                        <Switch>
                            <PrivateRoute exact path="/" component={Main} />
                            <PrivateRoute path="/profile" component={Profile} />
                            <PrivateRoute path="/donate" component={Donate} />
                            <PrivateRoute path="/user/:id" component={User} />
                            <PrivateRoute path="/admin" component={Admin} />
                            {/*<PrivateRoute
                                path="/admin/user/:id"
                                component={AdminUserInfo}
                            />*/}
                            <Route path="/terms" component={Terms} />
                            <Route path="/privacy" component={Privacy} />
                            <Route render={() => <NotFound />} />
                        </Switch>
                    ) : (
                        <Loader containerStyle={{ height: '50vh' }} />
                    )}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    service: state.service,
    data: state.profile.data
})

const mapDispatchToProps = dispatch => ({
    loadProfile: () => {
        dispatch(t_loadProfile())
    },
    setIsAdmin: payload => {
        dispatch(a_setIsAdmin(payload))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Personal)
