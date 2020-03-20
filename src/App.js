import React, { Fragment, Suspense, lazy, PureComponent } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import i18next from 'i18next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import LanguageDetector from 'i18next-browser-languagedetector'

import { a_setLanguage } from './redux/actions'

import Personal from './routes/Personal'

import Header from './components/Header'
import Footer from './components/Footer'

import Loader from './components/service/Loader'
import ServerError from './components/service/ServerError'
import Modal from './components/service/Modal'

import ModalWindow from './components/common/ModalWindow'

import Welcome from './screens/Welcome'
import Login from './screens/Login'
import Register from './screens/Register'
import ResetPassword from './screens/ResetPassword'
import Terms from './screens/Terms'
import Privacy from './screens/Privacy'

import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'ladda/dist/ladda.min.css'
import './styles/main.css'
import './index.css'

// const Personal = lazy(() => import('./components/personal'))
const NotFound = lazy(() => import('./components/service/NotFound'))

class App extends PureComponent {
    componentDidMount() {
        i18next.use(LanguageDetector).init({
            fallbackLng: 'en',
            resources: {
                en: { translation: require('./languages/en.json') },
                ru: { translation: require('./languages/ru.json') }
            }
        })
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
                        <div className="container-fluid h-100 d-flex flex-column justify-content-between min-vh-100">
                            {modal && (
                                <Modal>
                                    {modal.children || <ModalWindow />}
                                </Modal>
                            )}
                            <Suspense fallback={<Loader className="h-100vh" />}>
                                {!auth ? (
                                    <Fragment>
                                        {!isAdmin && <Header />}
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
                                            <Route
                                                path="/privacy"
                                                component={Privacy}
                                            />
                                            <Route component={NotFound} />
                                        </Switch>
                                    </Fragment>
                                ) : (
                                    <Personal />
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
