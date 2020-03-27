import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import i18next from 'i18next'

import { a_setModal } from '../../redux/actions'
import {
	t_activation,
	t_email,
	t_nickname,
	t_allowShareEmail,
	t_changeSecretWord,
	t_updateEmail
} from '../../redux/tracks'
import {
	weightConverter,
	heightConverter,
	isValidEmail
} from '../../utils/helpers'

import Input from '../../components/common/Input'
import RegisterData from '../../components/profile/RegisterData'
import Loader from '../../components/service/Loader'

const { REACT_APP_SERVER } = process.env

class MyInfo extends PureComponent {
	state = {
		nickname: '',
		email: '',
		show_pass: false,
		password: '',
		secret_word: '',
		register: false,
		allow_share_email: false,
		emailing: false
	}

	async componentDidMount() {
		const {
			profile: {
				data: { nickname, email, secret_word, allow_share_email }
			},
			location: { search },
			updateEmail,
			history
		} = this.props
		this.setState({
			nickname,
			email,
			secret_word,
			allow_share_email
		})
		if (search) {
			const searchParams = new URLSearchParams(search.slice(1))
			if (searchParams.has('emailToken')) {
				const emailToken = searchParams.get('emailToken')
				updateEmail({
					emailToken,
					cb: email => {
						this.setState({ email })
					}
				})
				history.push('/profile')
			}
		}
	}

	allowShareEmail = async () => {
		const { allow_share_email } = this.state
		this.setState(ps => ({ allow_share_email: !ps.allow_share_email }))
		this.props.allowShareEmail({ allow_share_email: !allow_share_email })
	}
	saveNickname = async () => {
		const { nickname } = this.state
		this.props.changeNickname({ nickname })
	}
	saveEmail = async () => {
		const { email } = this.state
		if (isValidEmail(email)) {
			try {
				this.setState({ emailing: true })
				await this.props.changeEmail({ email })
				this.setState({ emailing: false })
			} catch (err) {
				this.setState({ emailing: false })
			}
		} else {
			toast.warning(i18next.t('Enter valid email'))
		}
	}
	saveSecretWord = async () => {
		const { secret_word } = this.state
		if (secret_word.length < 3 || secret_word.length > 20) {
			toast.warning(
				i18next.t(
					'Secret word min length is 3 characters, max length is 20 characters'
				)
			)
		} else {
			this.props.changeSecretWord({ secret_word })
		}
	}

	render() {
		const {
			setModal,
			profile: { data, heightUnit, weightUnit },
			activation
		} = this.props
		const {
			register,
			nickname,
			show_pass,
			email,
			allow_share_email,
			secret_word,
			emailing
		} = this.state
		const isObserver = data.role === 'observer'
		const {
			age,
			height,
			weight,
			waist,
			thighs,
			chest,
			operations,
			is_active,
			images,
			height_unit,
			weight_unit,
			moderated,
			ex_observer,
			main_photo,
			country,
			region,
			nationality
		} = data
		const regionLabel =
			country === 'United States'
				? i18next.t('state')
				: i18next.t('region')
		return (
			<div className="tab-pane fade show active">
				<div className="px-0 px-md-4">
					<div className="row">
						<div className="col-xl-4 col-lg-4">
							<div className="d-flex">
								<Input
									value={nickname}
									changeHandler={value =>
										this.setState({
											nickname: value
										})
									}
									placeholder="nickname"
								/>
								<button
									onClick={() => this.saveNickname()}
									className="ml-3 btn-link link-active-outline"
								>
									{i18next.t('update')}
								</button>
							</div>
							{data.one_time_password && (
								<Fragment>
									<div className="d-flex mt-3">
										<Input
											value={data.one_time_password}
											changeHandler={password =>
												this.setState({
													password
												})
											}
											placeholder={i18next.t('password')}
											type={
												show_pass ? 'text' : 'password'
											}
											autoComplete="new-password"
											disabled
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
												{i18next.t('show password')}
											</span>
										</label>
									</div>
								</Fragment>
							)}
							<div className="d-flex mt-3">
								<Input
									value={email}
									changeHandler={email =>
										this.setState({ email })
									}
									type="email"
									placeholder={i18next.t('email')}
								/>
								<div className="d-flex">
									<button
										onClick={() => this.saveEmail()}
										className="ml-3 btn-link link-active-outline"
									>
										{i18next.t('update')}
									</button>
									{emailing && (
										<Loader style={{ fontSize: 14 }} />
									)}
								</div>
							</div>
							<div className="custom-checkbox ml-4 mt-4">
								<label tabIndex={5}>
									<input
										checked={allow_share_email}
										type="checkbox"
										onChange={() => this.allowShareEmail()}
									/>
									<span className="checkbox-icon checkbox-icon--rect" />
									<span className="ml-2">
										{i18next.t('allow share my email')}
									</span>
								</label>
							</div>
							<div className="d-flex mt-3">
								<Input
									value={secret_word}
									changeHandler={secret_word =>
										this.setState({ secret_word })
									}
									placeholder={i18next.t('secret word')}
								/>
								<button
									onClick={() => this.saveSecretWord()}
									className="ml-3 btn-link link-active-outline"
								>
									{i18next.t('update')}
								</button>
							</div>
						</div>
						<div className="col-xl-6 font-18 col-lg-5 mt-5 mt-lg-0">
							<p className="mb-0">
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Amet corporis debitis dolore
								dolores ea facere itaque iusto labore magnam
								maxime nam non obcaecati quod quos soluta sunt,
								totam, ullam? Dolorem.
							</p>
							<br />
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Atque beatae commodi deleniti
								ducimus earum ex expedita ipsa laudantium minus
								modi mollitia nostrum numquam, optio provident
								quasi, saepe vitae voluptates voluptatum.
							</p>
						</div>
						<div className="col-xl-2 col-lg-3 pt-5">
							<p className="text-uppercase text-center mb-3">
								{data.role}
							</p>
							<p className="text-center mb-0">
								{i18next.t('registration date')}:
							</p>
							<p className="text-center">
								{moment(data.created_at).format('DD/MM/YYYY')}
							</p>
						</div>
					</div>
				</div>
				{isObserver && data.sex === 'female' && !ex_observer && (
					<Fragment>
						<hr />
						<div className="px-0 px-md-4 position-relative">
							<div
								className="custom-checkbox position-absolute"
								id="show_pass_check"
							>
								<label>
									<input
										type="checkbox"
										checked={register}
										onChange={() =>
											this.setState(pS => ({
												register: !pS.register
											}))
										}
									/>
									<span className="checkbox-icon checkbox-icon--rect" />
								</label>
							</div>
							<p className="text-center font-18">
								{i18next.t('become a PARTICIPANT')}
							</p>
							{register && <RegisterData />}
						</div>
					</Fragment>
				)}
				{moderated && !isObserver ? (
					<Fragment>
						<div className="px-0 px-md-4">
							<div className="row">
								<div className="col-12 mt-3 mb-3">
									<h1 className="text-uppercase h2 text-center text-uppercase">
										{i18next.t('information')}
									</h1>
								</div>
							</div>
							<div className="row">
								<div className="col-xl-5 col-lg-6 col-md-12 flex-wrap d-flex flex-column flex-md-row">
									<div className="mr-5">
										<p className="mb-1 no-wrap">
											{i18next.t('Country')}: {country}
										</p>
										<p className="mb-1 no-wrap">
											{regionLabel}: {region}
										</p>
									</div>
									<div>
										<p className="mb-1 no-wrap">
											{i18next.t('Nationality')}:{' '}
											{nationality}
										</p>
										<p className="mb-1 no-wrap">
											{i18next.t('Age')}: {age}
										</p>
									</div>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-12 flex-wrap d-flex flex-column flex-md-row">
									<div className="mr-5">
										<p className="mb-1 no-wrap text-capitalize">
											{i18next.t('height')}:{' '}
											{heightConverter(
												height,
												height_unit,
												heightUnit
											)}{' '}
											{heightUnit}
										</p>
										<p className="mb-1 no-wrap text-capitalize">
											{i18next.t('chest')}:{' '}
											{heightConverter(
												chest,
												height_unit,
												heightUnit
											)}{' '}
											{heightUnit}
										</p>
										<p className="mb-1 no-wrap text-capitalize">
											{i18next.t('waist')}:{' '}
											{heightConverter(
												waist,
												height_unit,
												heightUnit
											)}{' '}
											{heightUnit}
										</p>
									</div>
									<div>
										<p className="mb-1 no-wrap text-capitalize">
											{i18next.t('thighs')}:{' '}
											{heightConverter(
												thighs,
												height_unit,
												heightUnit
											)}{' '}
											{heightUnit}
										</p>
										<p className="mb-1 no-wrap text-capitalize">
											{i18next.t('weight')}:{' '}
											{weightConverter(
												weight,
												weight_unit,
												weightUnit
											)}{' '}
											{weightUnit}
										</p>
										<p className="mb-1 no-wrap">
											{i18next.t('Operations')}:{' '}
											{operations
												? i18next.t('yes')
												: i18next.t('no')}
										</p>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-12 mt-3 mb-3">
									<h1 className="text-uppercase h2 text-center text-uppercase">
										{i18next.t('Photos')}
									</h1>
								</div>
								<div className="col-12 user-images">
									{images.map((i, ind) => (
										<div key={ind} className="image">
											<div className="likes">
												<span
													className={`${
														i.likes.length
															? 'fa'
															: 'far'
													} fa-heart`}
												/>
												<span className="text">
													{i.likes.length}
												</span>
											</div>
											<img
												className="img-fluid"
												src={REACT_APP_SERVER + i.url}
												alt="img"
											/>
											{i._id === main_photo._id && (
												<div className="is-main-photo">
													{i18next.t('main photo')}
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="d-flex justify-content-end mt-4">
							<a
								onClick={() =>
									setModal({
										title: `${i18next.t('Are you sure')}?`,
										onClick: async () =>
											await activation({
												is_active: !is_active
											}),
										buttonText: 'Ok'
									})
								}
								href="#!"
							>
								{is_active
									? i18next.t('deactivate the account')
									: i18next.t('activate the account')}
							</a>
						</div>
					</Fragment>
				) : (
					!moderated &&
					ex_observer && (
						<div className="mt-5">
							{i18next.t(
								'Information and photos will appear here, after going through moderation by admin'
							)}
						</div>
					)
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	profile: state.profile
})
const mapDispatchToProps = dispatch => ({
	setModal: payload => {
		dispatch(a_setModal(payload))
	},
	activation: async payload => {
		await dispatch(t_activation(payload))
	},
	changeEmail: async payload => {
		await dispatch(t_email(payload))
	},
	changeNickname: async payload => {
		await dispatch(t_nickname(payload))
	},
	allowShareEmail: async payload => {
		await dispatch(t_allowShareEmail(payload))
	},
	changeSecretWord: async payload => {
		await dispatch(t_changeSecretWord(payload))
	},
	updateEmail: async payload => {
		await dispatch(t_updateEmail(payload))
	}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyInfo))
