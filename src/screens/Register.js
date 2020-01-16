import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
// import i18next from 'i18next'

import { a_updateRegisterPhoto, a_updateRotation } from '../redux/actions'
import { debounce } from '../utils/helpers'
import { t_checkUniq, t_register } from '../redux/tracks'
import { forbiddenKeyCodes } from '../constants'

import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Select from '../components/common/Select'
import ImageUpload from '../components/common/ImageUpload'
import AddPhoto from '../components/AddPhoto'
import Captcha from '../components/service/Captcha'

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
		country: '',
		region: '',
		locality: '',
		height: '',
		weight: '',
		chest: '',
		waist: '',
		thighs: '',
		operations: false,
		nationality: '',
		age: '',
		uniq: true,
		registration: false,
		captcha: '',
		imagesArray: []
	}

	componentDidMount() {
		const el = document.querySelector('.logo')
		el.scrollIntoView({ block: 'start', behavior: 'smooth' })
	}

	handleImageUpload = acceptedFiles => {
		const { updateRegisterPhoto } = this.props
		updateRegisterPhoto({ index: 0, value: acceptedFiles[0] })
	}

	checkUniq = debounce(async () => {
		const { checkUniq } = this.props
		const { email, nickname } = this.state
		try {
			await checkUniq({ email, nickname })
			this.setState({ uniq: true })
		} catch (err) {
			this.setState({ uniq: false })
		}
	}, 1000)

	register = async (field, value) => {
		try {
			const { register, registerPhotos, history, rotations } = this.props
			let fields = { ...this.state }
			let err = false
			if (!registerPhotos.length) {
				toast.warning('Choose at least one image')
				err = true
			}
			if (!fields.region) {
				toast.warning('Choose region')
				err = true
			}
			if (!err) {
				const payload = new FormData()
				const l = registerPhotos.length
				for (let i = 0; i < l; i++) {
					payload.append('files', registerPhotos[i])
				}
				fields.uniq = undefined
				fields.registration = undefined
				payload.append('data', JSON.stringify(fields))
				payload.append('rotations', JSON.stringify(rotations))
				this.setState({ registration: true })
				await register(payload)
				history.push('/login')
				if (this.state.with_email) {
					toast.success(
						'When the profile passes admin moderation, an alert will be sent to your email'
					)
				} else {
					toast.success('Try to log in through time')
				}
			}
		} catch (err) {
			this.setState({ registration: false })
		}
	}

	rotate() {
		const { updateRotation, rotations } = this.props
		const newRotation = rotations[0] + 90 >= 360 ? 0 : rotations[0] + 90
		updateRotation({ index: 0, value: newRotation })
	}

	render() {
		const {
			with_email,
			nickname,
			email,
			allow_share_email,
			show_pass,
			operations,
			uniq,
			country,
			region,
			registration,
			nationality,
			locality,
			imagesArray
		} = this.state
		const { registerPhotos, rotations } = this.props
		const addPhoto =
			registerPhotos.length < 5 &&
			registerPhotos.length - 1 === imagesArray.length
		const regionLabel = country === 'United States' ? 'state' : 'region'
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
									<label>
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
										<Input
											classNames="mt-3"
											changeHandler={value =>
												this.setState({
													nickname: value,
													uniq: true
												})
											}
											placeholder="nickname"
											onBlur={() => this.checkUniq()}
											label={
												nickname && !with_email && !uniq
													? 'User with this nickname already exist'
													: null
											}
										/>
									</label>
								</div>
								<div className="custom-checkbox my-3">
									<label>
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
										<Input
											classNames="mt-3"
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
												email && with_email && !uniq
													? 'User with this email already exist'
													: null
											}
										/>
									</label>
								</div>

								<div className="custom-checkbox ml-4 mt-4">
									<label>
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
									<Input
										classNames="mt-3"
										changeHandler={value =>
											this.setState({
												secret_word: value
											})
										}
										placeholder="secret word"
									/>
								)}
								<Input
									classNames="mt-3"
									changeHandler={value =>
										this.setState({
											password: value
										})
									}
									placeholder="password"
									type={show_pass ? 'text' : 'password'}
									autoComplete="new-password"
								/>
								<div
									className="custom-checkbox ml-4 mt-4"
									id="show_pass_check"
								>
									<label>
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
								<Input
									classNames="mt-3"
									changeHandler={value =>
										this.setState({
											repeat_password: value
										})
									}
									placeholder="repeat password"
									type={show_pass ? 'text' : 'password'}
									autoComplete="new-password"
								/>
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
							<div className="col-lg-4 col-md-6 d-flex flex-column flex-md-row justify-content-between">
								<div className="mr-4">
									<div className="position-relative">
										<div className="left-asterisk">
											<CountryDropdown
												value={country}
												onChange={country =>
													this.setState({
														country
													})
												}
												classes="country-region-select"
												defaultOptionLabel="country"
											/>
										</div>
									</div>
									<div className="position-relative">
										<div className="left-asterisk">
											<RegionDropdown
												country={country}
												value={region}
												onChange={region =>
													this.setState({
														region
													})
												}
												classes="country-region-select"
												defaultOptionLabel={regionLabel}
												disabled={!country}
												blankOptionLabel={regionLabel}
											/>
										</div>
									</div>
									<div className="position-relative">
										<div className="left-asterisk">
											<RegionDropdown
												country={country}
												value={locality}
												onChange={locality =>
													this.setState({
														locality
													})
												}
												classes="country-region-select"
												defaultOptionLabel="locality"
												disabled={!region}
												blankOptionLabel="locality"
											/>
										</div>
									</div>
								</div>
								<div>
									<div className="position-relative">
										<div className="left-asterisk">
											<CountryDropdown
												value={nationality}
												onChange={nationality =>
													this.setState({
														nationality
													})
												}
												classes="country-region-select"
												defaultOptionLabel="nationality"
											/>
										</div>
									</div>
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
										<Input
											classNames="with-asterisk mb-2 mx-2"
											changeHandler={height =>
												this.setState({ height })
											}
											placeholder="height"
											type="number"
											min={10}
											max={300}
											step={0.1}
											onKeyDown={e =>
												forbiddenKeyCodes.includes(
													e.keyCode
												) && e.preventDefault()
											}
										/>
										<Input
											classNames="with-asterisk mb-2 mx-2"
											changeHandler={chest =>
												this.setState({ chest })
											}
											placeholder="chest"
											type="number"
											min={10}
											max={300}
											step={0.1}
											onKeyDown={e =>
												forbiddenKeyCodes.includes(
													e.keyCode
												) && e.preventDefault()
											}
										/>
									</div>
									<div className="col-12 col-md-4">
										<Input
											classNames="with-asterisk mb-2 mx-2"
											changeHandler={waist =>
												this.setState({ waist })
											}
											placeholder="waist"
											type="number"
											min={10}
											max={300}
											step={0.1}
											onKeyDown={e =>
												forbiddenKeyCodes.includes(
													e.keyCode
												) && e.preventDefault()
											}
										/>
										<Input
											classNames="with-asterisk mb-2 mx-2"
											changeHandler={thighs =>
												this.setState({ thighs })
											}
											placeholder="thighs"
											type="number"
											min={10}
											max={300}
											step={0.1}
											onKeyDown={e =>
												forbiddenKeyCodes.includes(
													e.keyCode
												) && e.preventDefault()
											}
										/>
									</div>
									<div className="col-12 col-md-4">
										<Input
											classNames="with-asterisk mb-2 mx-2"
											changeHandler={weight =>
												this.setState({ weight })
											}
											placeholder="weight"
											type="number"
											min={10}
											max={300}
											step={0.1}
											onKeyDown={e =>
												forbiddenKeyCodes.includes(
													e.keyCode
												) && e.preventDefault()
											}
										/>
									</div>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="custom-checkbox mb-3">
									<label>
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
								<ImageUpload onDrop={this.handleImageUpload} />
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
							<div className="col-lg-5 mb-3 d-flex justify-content-center">
								<div
									className="image-container"
									style={{
										transform: `rotate(${rotations[0]}deg)`
									}}
								>
									{registerPhotos[0] && (
										<img
											src={URL.createObjectURL(
												registerPhotos[0]
											)}
											alt="img"
										/>
									)}
								</div>
							</div>
							<div className="col-lg-5 d-flex flex-column justify-content-between mb-3">
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
								{registerPhotos[0] && (
									<button
										onClick={() => this.rotate()}
										className="btn btn-outline-light mr-auto d-flex align-items-center justify-content-center"
									>
										<span className="fa fa-redo p-1" />
									</button>
								)}
							</div>
						</div>
						{imagesArray.map((i, id) => (
							<AddPhoto
								key={id}
								index={id + 1}
								close={() =>
									this.setState(ps => ({
										imagesArray: [
											...ps.imagesArray.slice(0, -1)
										]
									}))
								}
							/>
						))}
						{addPhoto && (
							<div className="row">
								<a
									onClick={() =>
										this.setState(ps => ({
											imagesArray: [
												...ps.imagesArray,
												ps.imagesArray.length
											]
										}))
									}
									className="mb-5"
									href="#!"
								>
									add more
								</a>
							</div>
						)}
						<div className="row">
							<div className="col-lg-3 col-md-4 col-6">
								<Captcha />
								<Input
									classNames="ml-0 mb-3"
									changeHandler={captcha =>
										this.setState({ captcha })
									}
									placeholder="captcha"
								/>
							</div>
						</div>
						<div className="d-flex align-items-center justify-content-between">
							<Button
								className="text-uppercase"
								label="submit"
								loading={registration}
								onClick={() => this.register()}
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
	registerPhotos: state.service.registerPhotos,
	rotations: state.service.rotations,
	language: state.profile.language
})
const mapDispatchToProps = dispatch => ({
	updateRegisterPhoto: payload => {
		dispatch(a_updateRegisterPhoto(payload))
	},
	updateRotation: payload => {
		dispatch(a_updateRotation(payload))
	},
	checkUniq: async payload => {
		await dispatch(t_checkUniq(payload))
	},
	register: async payload => {
		await dispatch(t_register(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
