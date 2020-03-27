import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import i18next from 'i18next'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'

import { a_updateRegisterPhoto, a_updateRotation } from '../../redux/actions'
import { t_registerParticipant } from '../../redux/tracks'
import { forbiddenKeyCodes, ages } from '../../constants'

import Input from '../common/Input'
import Button from '../common/Button'
import Select from '../common/Select'
import ImageUpload from '../common/ImageUpload'
import AddPhoto from '../AddPhoto'
import FullWindowLoader from '../service/FullWindowLoader'

class Register extends PureComponent {
	state = {
		country: '',
		region: '',
		height: '',
		weight: '',
		chest: '',
		waist: '',
		thighs: '',
		operations: false,
		nationality: '',
		age: '',
		registration: false,
		imagesArray: []
	}

	handleImageUpload = acceptedFiles => {
		const { updateRegisterPhoto } = this.props
		updateRegisterPhoto({ index: 0, value: acceptedFiles[0] })
	}

	register = async (field, value) => {
		try {
			const {
				register,
				registerPhotos,
				rotations,
				profile: { heightUnit, weightUnit }
			} = this.props
			let fields = { ...this.state }
			let err = false
			if (!fields.country) {
				toast.warning('Choose country')
				err = true
			}
			if (!fields.region) {
				toast.warning('Choose region')
				err = true
			}
			if (!fields.nationality) {
				toast.warning('Choose nationality')
				err = true
			}
			if (!fields.age) {
				toast.warning('Choose age')
				err = true
			}
			if (fields.height < 10 || fields.height > 300) {
				toast.warning('Min height value is 10, max - 300')
				err = true
			}
			if (fields.chest < 10 || fields.chest > 300) {
				toast.warning('Min chest value is 10, max - 300')
				err = true
			}
			if (fields.waist < 10 || fields.waist > 300) {
				toast.warning('Min waist value is 10, max - 300')
				err = true
			}
			if (fields.thighs < 10 || fields.thighs > 300) {
				toast.warning('Min thighs value is 10, max - 300')
				err = true
			}
			if (fields.weight < 10 || fields.weight > 300) {
				toast.warning('Min weight value is 10, max - 300')
				err = true
			}
			if (registerPhotos.length === 0) {
				toast.warning('Choose at least one image')
				err = true
			}
			if (!err) {
				const payload = new FormData()
				const l = registerPhotos.length
				for (let i = 0; i < l; i++) {
					payload.append('files', registerPhotos[i])
				}
				fields.registration = undefined
				payload.append(
					'data',
					JSON.stringify({
						...fields,
						height_unit: heightUnit,
						weight_unit: weightUnit
					})
				)
				payload.append('rotations', JSON.stringify(rotations))
				this.setState({ registration: true })
				await register(payload)
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

	// async componentDidMount() {
	// 	try {
	// 		let countries = await geonames.countryInfo({})
	// 		countries = countries.geonames.map(c => {
	// 			return {
	// 				label: c.countryName,
	// 				value: c.geonameId
	// 			}
	// 		})
	// 		this.setState({ countries })
	// 	} catch (err) {
	// 		console.error(err)
	// 	}
	// }

	// selectCountry = async geonameId => {
	// 	const states = await geonames.children({
	// 		geonameId
	// 	})
	// 	const regions = states.geonames.map(c => {
	// 		return {
	// 			label: c.name,
	// 			value: c.geonameId
	// 		}
	// 	})
	// 	this.setState({ country: geonameId, regions })
	// }

	render() {
		const {
			operations,
			registration,
			imagesArray,
			country,
			region,
			nationality
		} = this.state
		const { registerPhotos, rotations } = this.props
		const addPhoto =
			registerPhotos.length < 5 &&
			registerPhotos.length - 1 === imagesArray.length
		const regionLabel =
			country === 'United States'
				? i18next.t('state')
				: i18next.t('region')
		return (
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
										defaultOptionLabel={i18next.t(
											'country'
										)}
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
										defaultOptionLabel={i18next.t(
											'nationality'
										)}
									/>
								</div>
							</div>
							<Select
								className="left-asterisk"
								onChange={({ value }) =>
									this.setState({ age: value })
								}
								options={[
									{
										label: i18next.t('age'),
										value: ''
									},
									...ages
								]}
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
									placeholder={i18next.t('height')}
									type="number"
									min={1}
									max={300}
									step={0.1}
									onKeyDown={e =>
										forbiddenKeyCodes.includes(e.keyCode) &&
										e.preventDefault()
									}
								/>
								<Input
									classNames="with-asterisk mb-2 mx-2"
									changeHandler={chest =>
										this.setState({ chest })
									}
									placeholder={i18next.t('chest')}
									type="number"
									min={1}
									max={300}
									step={0.1}
									onKeyDown={e =>
										forbiddenKeyCodes.includes(e.keyCode) &&
										e.preventDefault()
									}
								/>
							</div>
							<div className="col-12 col-md-4">
								<Input
									classNames="with-asterisk mb-2 mx-2"
									changeHandler={waist =>
										this.setState({ waist })
									}
									placeholder={i18next.t('waist')}
									type="number"
									min={1}
									max={300}
									step={0.1}
									onKeyDown={e =>
										forbiddenKeyCodes.includes(e.keyCode) &&
										e.preventDefault()
									}
								/>
								<Input
									classNames="with-asterisk mb-2 mx-2"
									changeHandler={thighs =>
										this.setState({ thighs })
									}
									placeholder={i18next.t('thighs')}
									type="number"
									min={1}
									max={300}
									step={0.1}
									onKeyDown={e =>
										forbiddenKeyCodes.includes(e.keyCode) &&
										e.preventDefault()
									}
								/>
							</div>
							<div className="col-12 col-md-4">
								<Input
									classNames="with-asterisk mb-2 mx-2"
									changeHandler={weight =>
										this.setState({ weight })
									}
									placeholder={i18next.t('weight')}
									type="number"
									min={1}
									max={300}
									step={0.1}
									onKeyDown={e =>
										forbiddenKeyCodes.includes(e.keyCode) &&
										e.preventDefault()
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
									{i18next.t('I did some plastic operations')}
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
									{i18next.t(
										'I never did plastic operations'
									)}
								</span>
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 mt-5 mb-3">
						<h1 className="text-uppercase h2 text-center">
							{i18next.t('photos')}
						</h1>
						<p className="text-center">
							(add at least 1 photo, maximum - 5)
						</p>
					</div>
					<div className="col-lg-2 mb-3">
						<ImageUpload onDrop={this.handleImageUpload} />
						<div className="custom-checkbox mt-2">
							<label>
								<input
									defaultChecked
									disabled
									type="checkbox"
								/>
								<span className="checkbox-icon checkbox-icon--rect" />
								<span className="ml-2">
									{i18next.t('main photo')}
								</span>
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
									src={URL.createObjectURL(registerPhotos[0])}
									alt="img"
								/>
							)}
						</div>
					</div>
					<div className="col-lg-5 d-flex flex-column justify-content-between mb-3">
						<div>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. At debitis eaque esse eveniet
								ipsam officiis provident sapiente ullam? Aliquam
								cumque deserunt facere in laboriosam maxime
								natus neque obcaecati, quasi quis.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Commodi consequuntur dicta
								dolorum expedita explicabo fuga nihil placeat
								saepe tempora ut. Aliquid atque autem eligendi
								nemo, numquam quis similique voluptate!
								Repellendus?
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
								imagesArray: [...ps.imagesArray.slice(0, -1)]
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
							{i18next.t('add more')}
						</a>
					</div>
				)}
				<div className="d-flex align-items-center justify-content-between">
					<Button
						className="text-uppercase"
						label={i18next.t('submit')}
						loading={registration}
						onClick={() => this.register()}
					/>
				</div>
				{registration && <FullWindowLoader />}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	registerPhotos: state.service.registerPhotos,
	rotations: state.service.rotations,
	modal: state.service.modal,
	profile: state.profile
})
const mapDispatchToProps = dispatch => ({
	updateRegisterPhoto: payload => {
		dispatch(a_updateRegisterPhoto(payload))
	},
	updateRotation: payload => {
		dispatch(a_updateRotation(payload))
	},
	register: async payload => {
		await dispatch(t_registerParticipant(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
