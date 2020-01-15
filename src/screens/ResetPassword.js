import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import i18next from 'i18next'

import { t_resetPassword } from '../redux/tracks'

import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Captcha from '../components/service/Captcha'

class ResetPassword extends PureComponent {
	state = {
		email: '',
		secret_word: '',
		submitting: false,
		captcha: ''
	}

	submit = async () => {
		const { resetPassword } = this.props
		const { email, secret_word, submitting, captcha } = this.state
		if (!submitting) {
			if (email && secret_word && captcha) {
				this.setState({ submitting: true })
				try {
					await resetPassword({
						email,
						secret_word,
						captcha
					})
					this.setState({ submitting: false })
				} catch (err) {
					this.setState({ submitting: false })
				}
			} else {
				toast.warn(i18next.t('Fill in all the fields'))
			}
		}
	}
	render() {
		const { submitting } = this.state
		return (
			<div className="d-flex flex-column m-auto justify-content-center">
				<div className="text-uppercase mb-3 text-center">
					reset password
				</div>
				<Input
					changeHandler={email => this.setState({ email })}
					placeholder="email"
					classNames="ml-0"
				/>
				<Input
					changeHandler={secret_word =>
						this.setState({ secret_word })
					}
					placeholder="secret word"
					classNames="ml-0 my-2"
				/>
				<Captcha />
				<Input
					classNames="ml-0 mb-3"
					changeHandler={captcha => this.setState({ captcha })}
					placeholder="captcha"
				/>
				<Button
					onClick={() => this.submit()}
					loading={submitting}
					label="submit"
				/>
				<div className="mx-auto mt-4">
					<Link to="/">signup</Link>
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
	resetPassword: async payload => {
		await dispatch(t_resetPassword(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
