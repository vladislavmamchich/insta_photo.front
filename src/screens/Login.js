import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import i18next from 'i18next'

import { t_login, t_emailRegisterConfirm } from '../redux/tracks'

import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Captcha from '../components/service/Captcha'

class Login extends PureComponent {
	state = {
		email: '',
		password: '',
		show_pass: false,
		remember_me: true,
		submitting: false,
		captcha: ''
	}

	submit = async () => {
		const { login, history } = this.props
		const { email, password, remember_me, submitting, captcha } = this.state
		if (!submitting) {
			if (email && password && captcha) {
				this.setState({ submitting: true })
				try {
					if (remember_me) {
						localStorage.setItem(
							'login_data',
							JSON.stringify({ email, password })
						)
					} else {
						localStorage.removeItem('login_data')
					}
					await login({
						email,
						password,
						captcha
					})
					history.push('/profile')
				} catch (err) {
					this.setState({ submitting: false })
				}
			} else {
				toast.warn(i18next.t('Fill in all the fields'))
			}
		}
	}

	async componentDidMount() {
		const loginData = localStorage.getItem('login_data')
		if (loginData) {
			const { email, password } = JSON.parse(loginData)
			this.setState({ email, password })
		}
		const {
			location: { search },
			emailRegisterConfirm,
			history
		} = this.props
		if (search) {
			const searchParams = new URLSearchParams(search.slice(1))
			if (searchParams.has('emailRegisterToken')) {
				const emailRegisterToken = searchParams.get(
					'emailRegisterToken'
				)
				await emailRegisterConfirm({ emailRegisterToken })
				history.push('/login')
			}
		}
	}

	render() {
		const {
			show_pass,
			remember_me,
			submitting,
			email,
			password
		} = this.state
		return (
			<div className="d-flex flex-column m-auto justify-content-center">
				<div className="text-uppercase mb-3 text-center">log in</div>
				<Input
					classNames="ml-0"
					changeHandler={email => this.setState({ email })}
					placeholder={i18next.t('nickname / email')}
					value={email}
					type="email"
				/>
				<Input
					classNames="ml-0 my-3"
					changeHandler={password => this.setState({ password })}
					type={show_pass ? 'text' : 'password'}
					placeholder={i18next.t('password')}
					autoComplete="new-password"
					value={password}
				/>
				<div className="custom-checkbox">
					<label tabIndex={3}>
						<input
							onChange={e =>
								this.setState({ show_pass: e.target.checked })
							}
							type="checkbox"
							value={show_pass}
						/>
						<span className="checkbox-icon checkbox-icon--rect" />
						<span className="ml-2">
							{i18next.t('show password')}
						</span>
					</label>
				</div>
				<div className="custom-checkbox">
					<label tabIndex={4}>
						<input
							onChange={e =>
								this.setState({ remember_me: e.target.checked })
							}
							type="checkbox"
							checked={remember_me}
						/>
						<span className="checkbox-icon checkbox-icon--rect" />
						<span className="ml-2">{i18next.t('remember me')}</span>
					</label>
				</div>
				<Captcha />
				<Input
					classNames="ml-0 mb-3"
					changeHandler={captcha => this.setState({ captcha })}
					placeholder={i18next.t('captcha')}
				/>
				<Button
					loading={submitting}
					onClick={() => this.submit()}
					label={i18next.t('submit')}
				/>
				<div className="mx-auto mt-3">
					<Link to="/">{i18next.t('signup')}</Link>
					<span>&nbsp;|&nbsp;</span>
					<Link to="/reset_pass">
						{i18next.t('forgot password')}?
					</Link>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loading: state.service.loading,
	language: state.profile.language
})
const mapDispatchToProps = dispatch => ({
	login: async payload => {
		await dispatch(t_login(payload))
	},
	emailRegisterConfirm: async payload => {
		await dispatch(t_emailRegisterConfirm(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
