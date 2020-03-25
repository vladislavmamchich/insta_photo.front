import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import i18next from 'i18next'

import { t_changePassword } from '../../redux/tracks'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

class ChangePassword extends PureComponent {
	state = {
		show_pass: false,
		old_password: '',
		new_password: '',
		repeat_password: '',
		loading: false
	}
	changePassword = async () => {
		const { changePassword } = this.props
		const { old_password, new_password, repeat_password } = this.state
		let err = false
		if (!old_password) {
			toast.warn(i18next.t('Enter old password, please'))
			err = true
		}
		if (new_password.length < 6 || new_password.length > 12) {
			toast.warning(
				i18next.t(
					'New password min length is 6 characters, max length is 12 characters'
				)
			)
			err = true
		}
		if (new_password !== repeat_password) {
			toast.warn(i18next.t('New passwords do not match'))
			err = true
		}
		if (!err) {
			this.setState({ loading: true })
			try {
				await changePassword({
					old_password,
					new_password,
					repeat_password
				})
				this.setState({
					loading: false,
					old_password: '',
					new_password: '',
					repeat_password: '',
					show_pass: false
				})
			} catch (error) {
				this.setState({ loading: false })
			}
		}
	}
	render() {
		const {
			show_pass,
			loading,
			old_password,
			new_password,
			repeat_password
		} = this.state
		return (
			<div className="tab-pane fade show active">
				<div className="px-0 px-md-4">
					<div className="row">
						<div className="col-xl-4 col-lg-4">
							<div className="d-flex mt-4">
								<Input
									value={old_password}
									changeHandler={old_password =>
										this.setState({
											old_password
										})
									}
									placeholder={i18next.t('old password')}
									type={show_pass ? 'text' : 'password'}
									autoComplete="new-password"
								/>
							</div>
							<div className="d-flex mt-4">
								<Input
									value={new_password}
									changeHandler={new_password =>
										this.setState({
											new_password
										})
									}
									placeholder={i18next.t('new password')}
									type={show_pass ? 'text' : 'password'}
									autoComplete="new-password"
								/>
							</div>
							<div className="d-flex mt-4">
								<Input
									value={repeat_password}
									changeHandler={repeat_password =>
										this.setState({
											repeat_password
										})
									}
									placeholder={i18next.t(
										'repeat new password'
									)}
									type={show_pass ? 'text' : 'password'}
									autoComplete="new-password"
								/>
							</div>
							<div
								className="custom-checkbox ml-4 mt-4"
								id="show_pass_check"
							>
								<label>
									<input
										checked={show_pass}
										onChange={() =>
											this.setState(ps => ({
												show_pass: !ps.show_pass
											}))
										}
										type="checkbox"
									/>
									<span className="checkbox-icon checkbox-icon--rect" />
									<span className="ml-2">
										{i18next.t('show passwords')}
									</span>
								</label>
							</div>
							<div className="d-flex ml-4 mt-4">
								<Button
									className="text-uppercase"
									label={i18next.t('submit')}
									loading={loading}
									onClick={() => this.changePassword()}
								/>
							</div>
						</div>
					</div>
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
	changePassword: async payload => {
		await dispatch(t_changePassword(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
