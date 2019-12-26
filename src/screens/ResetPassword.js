import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

// import { t_login } from '../../redux/tracks'
import Button from '../components/common/Button'

class ResetPassword extends PureComponent {
	state = {
		email: '',
		secret_word: '',
		submitting: false
	}

	// submit = async () => {
	// 	const { login } = this.props
	// 	const { email, password, remember_me, submitting } = this.state
	// 	if (!submitting) {
	// 		if (email && password) {
	// 			this.setState({ submitting: true })
	// 			await login({
	// 				email,
	// 				password,
	// 				remember_me
	// 			})
	// 			this.setState({ submitting: false })
	// 		} else {
	// 			toast.warn(i18next.t('Fill in all the fields'))
	// 		}
	// 	}
	// }
	render() {
		const { email, secret_word } = this.state
		return (
			<div className="d-flex flex-column align-items-center justify-content-center">
				<div className="text-uppercase mb-3 text-center">
					reset password
				</div>
				<div className="custom-input">
					<input
						tabIndex={1}
						required
						type="text"
						placeholder="nickname / email"
						onChange={e => this.setState({ email: e.target.value })}
						value={email}
					/>
				</div>
				<div className="custom-input my-2">
					<input
						tabIndex={2}
						required
						type="text"
						placeholder="secret word"
						onChange={e =>
							this.setState({ secret_word: e.target.value })
						}
						value={secret_word}
					/>
				</div>
				<Button label="captcha" className="mt-4 mb-3" />
				<Button label="submit" />
				<div className="mx-auto mt-4">
					<Link to="/register">signup</Link>
					<span>&nbsp;|&nbsp;</span>
					<Link to="/login">login</Link>
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
	// login: ({ payload, fail }) => {
	// 	dispatch(t_login({ payload, fail }))
	// }
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
