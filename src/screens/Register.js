import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

// import { t_login } from '../../redux/tracks'
import Button from '../components/common/Button'
import Select from '../components/common/Select'
import AddPhoto from '../components/AddPhoto'

let photos = []

class Register extends PureComponent {
	state = {
		with_email: false,
		nickname: '',
		email: '',
		allow_share_email: false,
		secret_word: '',
		password: '',
		show_pass: false,
		repeat_password: '',
		country: null,
		region: null,
		locality: null,
		height: '',
		weight: '',
		chest: '',
		waist: '',
		thighs: '',
		operations: false,
		nationality: '',
		age: ''
	}

	componentDidMount() {
		const el = document.querySelector('.logo')
		el.scrollIntoView({ block: 'start', behavior: 'smooth' })
	}

	render() {
		const {
			with_email,
			nickname,
			email,
			allow_share_email,
			secret_word,
			password,
			show_pass,
			repeat_password,
			height,
			weight,
			chest,
			waist,
			thighs,
			operations
		} = this.state
		return (
			<div className="px-2 px-lg-5">
				<div className="mt-5 registration">
					<div className="px-0 px-md-4">
						<h1 className="text-uppercase h2 text-center mb-4">
							Participant registration
						</h1>
						<div className="row">
							<div className="col-lg-3">
								<div className="custom-checkbox my-3">
									<label tabIndex={1}>
										<input
											checked={!with_email}
											type="radio"
											onChange={() =>
												this.setState({
													with_email: false
												})
											}
										/>
										<span className="checkbox-icon" />
										<div className="custom-input">
											<input
												tabIndex={2}
												required
												type="text"
												name="nickname"
												placeholder="nickname"
												value={nickname}
												onChange={e =>
													this.setState({
														nickname: e.target.value
													})
												}
											/>
										</div>
									</label>
								</div>
								<div className="custom-checkbox my-3">
									<label tabIndex={1}>
										<input
											checked={with_email}
											type="radio"
											onChange={() =>
												this.setState({
													with_email: true
												})
											}
										/>
										<span className="checkbox-icon" />
										<div className="custom-input mt-3">
											<input
												tabIndex={3}
												required
												type="email"
												name="email"
												placeholder="email"
												value={email}
												onChange={e =>
													this.setState({
														email: e.target.value
													})
												}
											/>
										</div>
									</label>
								</div>

								<div className="custom-checkbox ml-4 mt-4">
									<label tabIndex={4}>
										<input
											onChange={() =>
												this.setState(ps => ({
													allow_share_email: !ps.allow_share_email
												}))
											}
											value={allow_share_email}
											type="checkbox"
										/>
										<span className="checkbox-icon checkbox-icon--rect" />
										<span className="ml-2">
											allow share my email
										</span>
									</label>
								</div>
								{with_email && (
									<div className="custom-input mt-3">
										<input
											tabIndex={5}
											required
											type="text"
											name="secret"
											placeholder="secret word"
											value={secret_word}
											onChange={e =>
												this.setState({
													secret_word: e.target.value
												})
											}
										/>
									</div>
								)}
								<div className="custom-input mt-3">
									<input
										tabIndex={6}
										required
										type={show_pass ? 'text' : 'password'}
										name="password"
										placeholder="password"
										autoComplete="new-password"
										value={password}
										onChange={e =>
											this.setState({
												password: e.target.value
											})
										}
									/>
								</div>
								<div
									className="custom-checkbox ml-4 mt-4"
									id="show_pass_check"
								>
									<label tabIndex={7}>
										<input
											type="checkbox"
											value={show_pass}
											onChange={e =>
												this.setState(ps => ({
													show_pass: !ps.show_pass
												}))
											}
										/>
										<span className="checkbox-icon checkbox-icon--rect" />
										<span className="ml-2">
											show password
										</span>
									</label>
								</div>
								<div className="custom-input mt-3">
									<input
										tabIndex={8}
										required
										type={show_pass ? 'text' : 'password'}
										name="password_confirm"
										placeholder="repeat password"
										value={repeat_password}
										onChange={e =>
											this.setState({
												repeat_password: e.target.value
											})
										}
									/>
								</div>
							</div>
							<div className="col-lg-9 mt-5 mt-lg-0 font-18">
								<p className="mb-0">
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Amet corporis debitis
									dolore dolores ea facere itaque iusto labore
									magnam maxime nam non obcaecati quod quos
									soluta sunt, totam, ullam? Dolorem.
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Aliquam aperiam asperiores
									aspernatur aut autem beatae dolores,
									eligendi illo illum labore maxime officiis
									optio pariatur quaerat qui, quidem quisquam
									rem, soluta!
								</p>
								<br />
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Atque beatae commodi
									deleniti ducimus earum ex expedita ipsa
									laudantium minus modi mollitia nostrum
									numquam, optio provident quasi, saepe vitae
									voluptates voluptatum.
								</p>
							</div>
						</div>
					</div>
					<hr />
					<div className="px-0 px-md-4">
						<div className="row">
							<div className="col-lg-4 col-md-6 d-flex flex-column flex-md-row">
								<div className="mr-4">
									<Select
										type="country"
										className="left-asterisk"
										onChange={country =>
											this.setState({ country })
										}
									/>
									<Select
										type="region"
										className="left-asterisk"
										onChange={region =>
											this.setState({ region })
										}
									/>
									<Select
										type="locality"
										className="left-asterisk"
										onChange={locality =>
											this.setState({ locality })
										}
									/>
								</div>
								<div>
									<Select
										type="nationality"
										className="left-asterisk"
										onChange={nationality =>
											this.setState({ nationality })
										}
									/>
									<Select
										type="age"
										className="left-asterisk"
										onChange={age => this.setState({ age })}
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
												value={height}
												onChange={e =>
													this.setState({
														height: e.target.value
													})
												}
											/>
										</div>
										<div className="custom-input with-asterisk my-2 mx-2">
											<input
												type="text"
												name="chest"
												placeholder="chest"
												value={chest}
												onChange={e =>
													this.setState({
														chest: e.target.value
													})
												}
											/>
										</div>
									</div>
									<div className="col-12 col-md-4">
										<div className="custom-input with-asterisk my-2 mx-2">
											<input
												type="text"
												name="waist"
												placeholder="waist"
												value={waist}
												onChange={e =>
													this.setState({
														waist: e.target.value
													})
												}
											/>
										</div>
										<div className="custom-input with-asterisk my-2 mx-2">
											<input
												type="text"
												name="thighs"
												placeholder="thighs"
												value={thighs}
												onChange={e =>
													this.setState({
														thighs: e.target.value
													})
												}
											/>
										</div>
									</div>
									<div className="col-12 col-md-4">
										<div className="custom-input with-asterisk my-2 mx-2">
											<input
												type="text"
												name="weight"
												placeholder="weight"
												value={weight}
												onChange={e =>
													this.setState({
														weight: e.target.value
													})
												}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="custom-checkbox my-3">
									<label tabIndex={9}>
										<input
											onChange={() =>
												this.setState({
													operations: true
												})
											}
											checked={operations}
											type="radio"
										/>
										<span className="checkbox-icon" />
										<span className="ml-2">
											I did some plastic operations
										</span>
									</label>
								</div>
								<div className="custom-checkbox my-3">
									<label tabIndex={9}>
										<input
											onChange={() =>
												this.setState({
													operations: false
												})
											}
											checked={!operations}
											type="radio"
										/>
										<span className="checkbox-icon" />
										<span className="ml-2">
											I never did plastic operations
										</span>
									</label>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12 mt-5 mb-3">
								<h1 className="text-uppercase h2 text-center">
									photos
								</h1>
								<p className="text-center">
									(add at least 1 photo, maximum - 5)
								</p>
							</div>
							<div className="col-lg-2 mb-3">
								<label className="btn btn-outline-light">
									<span>choose...</span>
									<input type="file" className="d-none" />
								</label>
								<div className="custom-checkbox mt-2">
									<label tabIndex={10}>
										<input
											defaultChecked
											disabled
											type="checkbox"
										/>
										<span className="checkbox-icon checkbox-icon--rect" />
										<span className="ml-2">main photo</span>
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
							<div className="col-lg-7 d-flex flex-column justify-content-between mb-3">
								<div>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipisicing elit. At debitis eaque esse
										eveniet ipsam officiis provident
										sapiente ullam? Aliquam cumque deserunt
										facere in laboriosam maxime natus neque
										obcaecati, quasi quis.
									</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipisicing elit. Commodi consequuntur
										dicta dolorum expedita explicabo fuga
										nihil placeat saepe tempora ut. Aliquid
										atque autem eligendi nemo, numquam quis
										similique voluptate! Repellendus?
									</p>
								</div>
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
									className="mb-5"
									href="#!"
								>
									add more
								</a>
							</div>
						)}
						<Button
							className="mt-2 text-uppercase"
							label="captcha"
						/>
						<div className="d-flex align-items-center justify-content-between">
							<Button
								className="mt-2 text-uppercase"
								label="submit"
							/>
							<div>
								<Link
									className="text-uppercase text-underline"
									to="/login"
								>
									log in
								</Link>{' '}
								if already registered
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
	// login: ({ payload, fail }) => {
	// 	dispatch(t_login({ payload, fail }))
	// }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
