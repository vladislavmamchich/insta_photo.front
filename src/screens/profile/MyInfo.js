import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
// import { NavLink } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { a_setModal } from '../../redux/actions'
import {
	t_activation,
	t_email,
	t_nickname,
	t_allowShareEmail,
	t_changeSecretWord
} from '../../redux/tracks'
import { weightConverter, heightConverter } from '../../utils/helpers'

import Input from '../../components/common/Input'
import RegisterData from '../../components/profile/RegisterData'

const { REACT_APP_SERVER } = process.env

class MyInfo extends PureComponent {
	state = {
		nickname: '',
		email: '',
		show_pass: false,
		password: '',
		secret_word: '',
		register: false,
		ex_observer: false,
		allow_share_email: false
	}
	componentDidMount() {
		const {
			profile: {
				data: {
					nickname,
					email,
					secret_word,
					ex_observer,
					allow_share_email
				}
			}
		} = this.props
		this.setState({
			nickname,
			email,
			secret_word,
			ex_observer,
			allow_share_email
		})
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
		this.props.changeEmail({ email })
	}
	saveSecretWord = async () => {
		const { secret_word } = this.state
		this.props.changeSecretWord({ secret_word })
	}

	render() {
		const {
			setModal,
			profile: { data, heightUnit, weightUnit },
			activation
		} = this.props
		const {
			register,
			ex_observer,
			nickname,
			show_pass,
			email,
			allow_share_email,
			secret_word
		} = this.state
		const isObserver = data.role === 'observer'
		const {
			country,
			region,
			locality,
			nationality,
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
			moderated
		} = data
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
									update
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
											placeholder="password"
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
												show password
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
									placeholder="email"
								/>
								<button
									onClick={() => this.saveEmail()}
									className="ml-3 btn-link link-active-outline"
								>
									update
								</button>
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
										allow share my email
									</span>
								</label>
							</div>
							<div className="d-flex mt-3">
								<Input
									value={secret_word}
									changeHandler={secret_word =>
										this.setState({ secret_word })
									}
									placeholder="secret word"
								/>
								<button
									onClick={() => this.saveSecretWord()}
									className="ml-3 btn-link link-active-outline"
								>
									update
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
								registration date:
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
								become a PARTICIPANT
							</p>
							{register && (
								<RegisterData
									onSucces={() =>
										this.setState({ ex_observer: true })
									}
								/>
							)}
						</div>
					</Fragment>
				)}
				{moderated && !isObserver ? (
					<Fragment>
						<div className="px-0 px-md-4">
							<div className="row">
								<div className="col-12 mt-3 mb-3">
									<h1 className="text-uppercase h2 text-center text-uppercase">
										information
									</h1>
								</div>
							</div>
							<div className="row">
								<div className="col-xl-5 col-lg-6 col-md-12 flex-wrap d-flex flex-column flex-md-row">
									<div className="mr-5">
										<p className="mb-1 no-wrap">
											Country: {country}
										</p>
										<p className="mb-1 no-wrap">
											{country === 'United States'
												? 'State'
												: 'Region'}
											: {region}
										</p>
										<p className="mb-1 no-wrap">
											Locality: {locality}
										</p>
									</div>
									<div>
										<p className="mb-1 no-wrap">
											Nationality: {nationality}
										</p>
										<p className="mb-1 no-wrap">
											Age: {age}
										</p>
									</div>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-12 flex-wrap d-flex flex-column flex-md-row">
									<div className="mr-5">
										<p className="mb-1 no-wrap">
											Height:{' '}
											{heightConverter(
												height,
												height_unit,
												heightUnit
											)}{' '}
											{heightUnit}
										</p>
										<p className="mb-1 no-wrap">
											Chest:{' '}
											{heightConverter(
												chest,
												height_unit,
												heightUnit
											)}{' '}
											{heightUnit}
										</p>
										<p className="mb-1 no-wrap">
											Waist:{' '}
											{heightConverter(
												waist,
												height_unit,
												heightUnit
											)}{' '}
											{heightUnit}
										</p>
									</div>
									<div>
										<p className="mb-1 no-wrap">
											Thighs:{' '}
											{heightConverter(
												thighs,
												height_unit,
												heightUnit
											)}{' '}
											{heightUnit}
										</p>
										<p className="mb-1 no-wrap">
											Weight:{' '}
											{weightConverter(
												weight,
												weight_unit,
												weightUnit
											)}{' '}
											{weightUnit}
										</p>
										<p className="mb-1 no-wrap">
											Operations:{' '}
											{operations ? 'yes' : 'no'}
										</p>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-12 mt-3 mb-3">
									<h1 className="text-uppercase h2 text-center text-uppercase">
										Photos
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
											{i.is_main && (
												<div className="is-main-photo">
													main photo
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
										title: 'You sure?',
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
									? 'deactivate the account'
									: 'activate the account'}
							</a>
						</div>
					</Fragment>
				) : (
					!moderated && (
						<div>
							Information and photos will appear here, after going
							through moderation by admin
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
	// checkUniq: async payload => {
	// 	await dispatch(t_checkUniq(payload))
	// },
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
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(MyInfo)
