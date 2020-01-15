import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import i18next from 'i18next'

import { t_login } from '../redux/tracks'

import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Captcha from '../components/service/Captcha'

class Login extends PureComponent {
	state = {
		email: '',
		password: '',
		show_pass: false,
		remember_me: false,
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
					await login({
						email,
						password,
						remember_me,
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

	render() {
		const { show_pass, remember_me, submitting } = this.state
		return (
			<div className="d-flex flex-column m-auto justify-content-center">
				<div className="text-uppercase mb-3 text-center">log in</div>
				<Input
					classNames="ml-0"
					changeHandler={email => this.setState({ email })}
					placeholder="nickname / email"
				/>
				<Input
					classNames="ml-0 my-3"
					changeHandler={password => this.setState({ password })}
					type={show_pass ? 'text' : 'password'}
					placeholder="password"
					autoComplete="new-password"
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
						<span className="ml-2">show password</span>
					</label>
				</div>
				<div className="custom-checkbox">
					<label tabIndex={4}>
						<input
							onChange={e =>
								this.setState({ remember_me: e.target.checked })
							}
							type="checkbox"
							value={remember_me}
						/>
						<span className="checkbox-icon checkbox-icon--rect" />
						<span className="ml-2">remember me</span>
					</label>
				</div>
				<Captcha />
				<Input
					classNames="ml-0 mb-3"
					changeHandler={captcha => this.setState({ captcha })}
					placeholder="captcha"
				/>
				<Button
					loading={submitting}
					onClick={() => this.submit()}
					label="submit"
				/>
				<div className="mx-auto mt-3">
					<Link to="/">signup</Link>
					<span>&nbsp;|&nbsp;</span>
					<Link to="/reset_pass">forgot password?</Link>
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
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
