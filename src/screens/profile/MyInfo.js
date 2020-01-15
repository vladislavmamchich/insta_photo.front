import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
// import { NavLink } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { a_setModal } from '../../redux/actions'

import Select from '../../components/common/Select'
import AddPhoto from '../../components/AddPhoto'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

let photos = []

class MyInfo extends PureComponent {
	state = {
		nickname: '',
		email: '',
		show_pass: false,
		password: '',
		secret_word: '',
		sex: 'female',
		register: false,
		ex_observer: false,
		uniqNickname: true,
		uniqEmail: true
	}
	componentDidMount() {
		const {
			profile: {
				data: {
					nickname,
					email,
					password,
					secret_word,
					sex,
					ex_observer
				}
			}
		} = this.props
		this.setState({
			nickname,
			email,
			password,
			secret_word,
			sex,
			ex_observer
		})
	}
	render() {
		const {
			setModal,
			profile: { data }
		} = this.props
		const {
			register,
			sex,
			ex_observer,
			nickname,
			uniqNickname,
			show_pass,
			email,
			uniqEmail
		} = this.state
		const isObserver = data.role === 'observer'
		console.log(data, sex)
		return (
			<div className="tab-pane fade show active">
				<div className="px-0 px-md-4">
					<div className="row">
						<div className="col-xl-3 col-lg-4">
							<div className="d-flex">
								<Input
									changeHandler={value =>
										this.setState({
											nickname: value,
											uniq: true
										})
									}
									placeholder="nickname"
									onBlur={() => this.checkUniq()}
									label={
										nickname && !uniqNickname
											? 'User with this nickname already exist'
											: null
									}
								/>
								<button className="ml-3 btn-link link-active-outline">
									update
								</button>
							</div>

							<div className="d-flex mt-3">
								<Input
									changeHandler={value =>
										this.setState({
											password: value
										})
									}
									placeholder="password"
									type={show_pass ? 'text' : 'password'}
									autoComplete="new-password"
								/>
								<button className="ml-3 btn-link link-active-outline">
									update
								</button>
							</div>
							<div
								className="custom-checkbox ml-4 mt-4"
								id="show_pass_check"
							>
								<label tabIndex={3}>
									<input type="checkbox" />
									<span className="checkbox-icon checkbox-icon--rect" />
									<span className="ml-2">show password</span>
								</label>
							</div>
							<div className="d-flex mt-3">
								<Input
									changeHandler={value =>
										this.setState({
											email: value,
											uniq: true
										})
									}
									type="email"
									placeholder="email"
									onBlur={() => this.checkUniq()}
									label={
										email && !uniqEmail
											? 'User with this email already exist'
											: null
									}
								/>
								<button className="ml-3 btn-link link-active-outline">
									update
								</button>
							</div>
							<div className="custom-checkbox ml-4 mt-4">
								<label tabIndex={5}>
									<input type="checkbox" />
									<span className="checkbox-icon checkbox-icon--rect" />
									<span className="ml-2">
										allow share my email
									</span>
								</label>
							</div>
							<div className="d-flex mt-3">
								<Input
									changeHandler={value =>
										this.setState({
											secret_word: value
										})
									}
									placeholder="secret word"
								/>
								<button className="ml-3 btn-link link-active-outline">
									update
								</button>
							</div>
							<div className="mt-3 ml-3 d-flex ali">
								<span>sex:&nbsp;</span>
								<Select
									type="sex"
									selected={sex}
									width="90px"
									onChange={sex => this.setState({ sex })}
								/>
							</div>
						</div>
						<div className="col-xl-7 font-18 col-lg-5 mt-5 mt-lg-0">
							<p className="mb-0">
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Amet corporis debitis dolore
								dolores ea facere itaque iusto labore magnam
								maxime nam non obcaecati quod quos soluta sunt,
								totam, ullam? Dolorem.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Aliquam aperiam asperiores
								aspernatur aut autem beatae dolores, eligendi
								illo illum labore maxime officiis optio pariatur
								quaerat qui, quidem quisquam rem, soluta!
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
				{isObserver && sex === 'female' && !ex_observer && (
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
								<Fragment>
									<div className="row">
										<div className="col-lg-4 col-md-6 d-flex flex-column flex-md-row">
											<div className="mr-4">
												<Select
													type="country"
													className="left-asterisk"
												/>
												<Select
													type="region"
													className="left-asterisk"
												/>
												<Select
													type="locality"
													className="left-asterisk"
												/>
											</div>
											<div>
												<Select
													type="nationality"
													className="left-asterisk"
												/>
												<Select
													type="age"
													className="left-asterisk"
												/>
											</div>
										</div>
										<div className="col-lg-5 col-md-6">
											<div className="row">
												<div className="col-12 col-md-4">
													<div className="custom-input with-asterisk my-2 mx-2">
														<input
															type="text"
															name="height"
															placeholder="height"
														/>
														<div className="ring" />
													</div>
													<div className="custom-input with-asterisk my-2 mx-2">
														<input
															type="text"
															name="chest"
															placeholder="chest"
														/>
														<div className="ring" />
													</div>
												</div>
												<div className="col-12 col-md-4">
													<div className="custom-input with-asterisk my-2 mx-2">
														<input
															type="text"
															name="weist"
															placeholder="weist"
														/>
														<div className="ring" />
													</div>
													<div className="custom-input with-asterisk my-2 mx-2">
														<input
															type="text"
															name="thighs"
															placeholder="thighs"
														/>
														<div className="ring" />
													</div>
												</div>
												<div className="col-12 col-md-4">
													<div className="custom-input with-asterisk my-2 mx-2">
														<input
															type="text"
															name="weight"
															placeholder="weight"
														/>
														<div className="ring" />
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-3">
											<div className="a">
												<div className="custom-checkbox mt-3 mt-lg-0 mb-3">
													<label tabIndex={3}>
														<input
															name="plastics"
															type="radio"
														/>
														<span className="checkbox-icon" />
														<span className="ml-2">
															I did some plastic
															operations
														</span>
													</label>
												</div>
												<div className="custom-checkbox my-3">
													<label tabIndex={3}>
														<input
															name="plastics"
															type="radio"
														/>
														<span className="checkbox-icon" />
														<span className="ml-2">
															I never did plastic
															operations
														</span>
													</label>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-12 mt-5 mb-3">
											<h1 className="text-uppercase h2 text-center text-uppercase">
												photos
											</h1>
											<p className="text-center">
												(add at least 1 photo, maximum
												5)
											</p>
										</div>
										<div className="col-lg-2 mb-3">
											<label className="btn btn-outline-light">
												<span>choose...</span>
												<input
													type="file"
													className="d-none"
												/>
											</label>
											<div className="custom-checkbox mt-2">
												<label tabIndex={3}>
													<input type="checkbox" />
													<span className="checkbox-icon checkbox-icon--rect" />
													<span className="ml-2">
														main photo
													</span>
												</label>
											</div>
										</div>
										<div className="col-lg-3 mb-3">
											<img
												src="http://lorempixel.com/500/600"
												className="img-fluid mx-auto d-block"
												alt="models"
											/>
										</div>
										<div className="col-lg-7 d-flex flex-column justify-content-end mb-3">
											<button className="btn btn-outline-light mr-auto d-flex align-items-center justify-content-center">
												<span className="fa fa-redo p-1" />
											</button>
										</div>
									</div>
									{photos.map((i, id) => (
										<AddPhoto key={id} />
									))}
									{photos.length < 4 && (
										<div className="row">
											<a
												onClick={() => photos.push(1)}
												className="mb-5 mx-3"
												href="#!"
											>
												add more
											</a>
										</div>
									)}
									<div className="my-3 justify-content-between">
										<Button
											// loading={submitting}
											onClick={() => this.submit()}
											label="submit"
											style={{ width: '150px' }}
										/>
									</div>
								</Fragment>
							)}
						</div>
					</Fragment>
				)}
				{!isObserver && (
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
										Country: United States
									</p>
									<p className="mb-1 no-wrap">
										State: Kentucky
									</p>
									<p className="mb-1 no-wrap">
										Locality: Crestwood
									</p>
								</div>
								<div>
									<p className="mb-1 no-wrap">
										Nationality: United States
									</p>
									<p className="mb-1 no-wrap">Age: 23</p>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-12 flex-wrap d-flex flex-column flex-md-row">
								<div className="mr-5">
									<p className="mb-1 no-wrap">
										Height: 67 inch
									</p>
									<p className="mb-1 no-wrap">
										Chest: 67 inch
									</p>
									<p className="mb-1 no-wrap">
										Waist: 67 inch
									</p>
								</div>
								<div>
									<p className="mb-1 no-wrap">
										Thighs: 67 inch
									</p>
									<p className="mb-1 no-wrap">
										Weight: 67 inch
									</p>
									<p className="mb-1 no-wrap">
										Operations: 0
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
								<div className="image d-flex flex-column">
									<div className="likes">
										<span className="far fa-heart" />
										<span className="text">20000000</span>
									</div>
									<img
										className="img-fluid"
										src="http://lorempixel.com/300/600"
										alt="photo1"
									/>
									<p className="mb-0 mt-1">main photo</p>
								</div>
								<div className="image d-flex flex-column">
									<div className="likes">
										<span className="far fa-heart" />
										<span className="text">20000000</span>
									</div>
									<img
										className="img-fluid"
										src="http://lorempixel.com/600/800"
										alt="photo1"
									/>
								</div>
								<div className="image d-flex flex-column">
									<div className="likes">
										<span className="far fa-heart" />
										<span className="text">20000000</span>
									</div>
									<img
										className="img-fluid"
										src="http://lorempixel.com/300/300"
										alt="photo1"
									/>
								</div>
								<div className="image d-flex flex-column">
									<div className="likes">
										<span className="far fa-heart" />
										<span className="text">20000000</span>
									</div>
									<img
										className="img-fluid"
										src="http://lorempixel.com/300/300"
										alt="photo1"
									/>
								</div>
								<div className="image d-flex flex-column">
									<div className="likes">
										<span className="far fa-heart" />
										<span className="text">20000000</span>
									</div>
									<img
										className="img-fluid"
										src="http://lorempixel.com/300/300"
										alt="photo1"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
				<a
					onClick={() => setModal({ title: 'test' })}
					href="#!"
					className="d-flex justify-content-end mt-3"
				>
					deactivate the account
				</a>
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
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(MyInfo)
