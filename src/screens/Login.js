import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import i18next from 'i18next'

import { t_login } from '../redux/tracks'

import Button from '../components/common/Button'

class Login extends PureComponent {
	state = {
		email: '',
		password: '',
		show_pass: false,
		remember_me: false,
		submitting: false
	}

	submit = async () => {
		const { login } = this.props
		const { email, password, remember_me, submitting } = this.state
		if (!submitting) {
			if (email && password) {
				this.setState({ submitting: true })
				await login({
					email,
					password,
					remember_me
				})
				this.setState({ submitting: false })
			} else {
				toast.warn(i18next.t('Fill in all the fields'))
			}
		}
	}

	render() {
		let { email, password, show_pass, remember_me, submitting } = this.state
		// const { loading } = this.props
		return (
			<div className="d-flex flex-column m-auto justify-content-center">
				<div className="text-uppercase mb-3 text-center">log in</div>
				<div className="custom-input ml-0">
					<input
						tabIndex={1}
						required
						type="text"
						placeholder="nickname / email"
						onChange={e => this.setState({ email: e.target.value })}
						value={email}
					/>
				</div>
				<div className="custom-input ml-0 my-3">
					<input
						tabIndex={2}
						required
						type={show_pass ? 'text' : 'password'}
						placeholder="password"
						autoComplete="new-password"
						onChange={e =>
							this.setState({ password: e.target.value })
						}
						value={password}
					/>
				</div>
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
				<Button label="captcha" className="my-3" />
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
