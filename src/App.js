import React, { Fragment, Suspense, lazy, PureComponent } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import i18next from 'i18next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { languages } from './constants'
import { a_setLanguage } from './redux/actions'

import Header from './components/Header'
import Footer from './components/Footer'
import Navs from './components/Navs'

import Loader from './components/service/Loader'
import PrivateRoute from './components/service/PrivateRoute'
import ServerError from './components/service/ServerError'

import ModalWindow from './components/common/ModalWindow'

import Welcome from './screens/Welcome'
import Login from './screens/Login'
import Register from './screens/Register'
import ResetPassword from './screens/ResetPassword'
import Terms from './screens/Terms'
import Main from './screens/Main'
import Profile from './screens/Profile'
import Donate from './screens/Donate'
import User from './screens/User'
import Admin from './screens/admin'
import AdminUserInfo from './screens/admin/AdminUserInfo'

import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'ladda/dist/ladda.min.css'
import './styles/main.css'
import './index.css'

// const Personal = lazy(() => import('./components/personal'))
const NotFound = lazy(() => import('./components/service/NotFound'))

class App extends PureComponent {
    componentDidMount() {
        const { language, setLanguage } = this.props
        const lng = language ? language.value.toLowerCase() : languages[0].value
        i18next.init({
            lng,
            resources: {
                en: { translation: require('./languages/en.json') },
                ru: { translation: require('./languages/ru.json') }
            }
        })
        setLanguage(lng)
    }

    render() {
        const {
            service: { auth, error, isAdmin, modal }
        } = this.props
        return (
            <Fragment>
                <ToastContainer />
                {error ? (
                    <ServerError />
                ) : (
                    <Router basename={process.env.REACT_APP_BASENAME}>
                        <div className="container-fluid h-100 d-flex flex-column justify-content-between">
                            {modal && <ModalWindow />}
                            {!isAdmin && <Header />}
                            <Suspense
                                fallback={<Loader className="app-loader" />}
                            >
                                {!auth ? (
                                    <Fragment>
                                        <Switch>
                                            <Route
                                                exact
                                                path="/"
                                                component={Welcome}
                                            />
                                            <Route
                                                path="/login"
                                                component={Login}
                                            />
                                            <Route
                                                path="/register"
                                                component={Register}
                                            />
                                            <Route
                                                path="/reset_pass"
                                                component={ResetPassword}
                                            />
                                            <Route
                                                path="/terms"
                                                component={Terms}
                                            />
                                            <Route component={NotFound} />
                                        </Switch>
                                    </Fragment>
                                ) : (
                                    <main className="px-2 px-lg-5">
                                        {!isAdmin && <Navs />}
                                        <Switch>
                                            <PrivateRoute
                                                path="/main"
                                                component={Main}
                                            />
                                            <PrivateRoute
                                                path="/profile"
                                                component={Profile}
                                            />
                                            <PrivateRoute
                                                path="/donate"
                                                component={Donate}
                                            />
                                            <PrivateRoute
                                                path="/user"
                                                component={User}
                                            />
                                            <PrivateRoute
                                                exact
                                                path="/admin"
                                                component={Admin}
                                            />
                                            <PrivateRoute
                                                path="/admin/user/:id"
                                                component={AdminUserInfo}
                                            />
                                            <Route
                                                path="/terms"
                                                component={Terms}
                                            />
                                            <Route
                                                render={() => <NotFound />}
                                            />
                                        </Switch>
                                    </main>
                                )}
                            </Suspense>
                            {!isAdmin && <Footer />}
                        </div>
                    </Router>
                )}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    service: state.service,
    language: state.profile.language
})

const mapDispatchToProps = dispatch => ({
    setLanguage: payload => {
        dispatch(a_setLanguage(payload))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
