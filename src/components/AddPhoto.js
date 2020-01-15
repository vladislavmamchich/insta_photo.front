import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

// import { t_login } from '../../redux/tracks'
import { a_updateRegisterPhoto, a_updateRotation } from '../redux/actions'
// import Button from '../components/common/Button'
// import Select from '../components/common/Select'
import ImageUpload from './common/ImageUpload'

class AddPhoto extends PureComponent {
	handleImageUpload = acceptedFiles => {
		const { updateRegisterPhoto, index } = this.props
		updateRegisterPhoto({ index, value: acceptedFiles[0] })
	}

	rotate() {
		const { updateRotation, index, rotations } = this.props
		let newRotation = rotations[index] + 90
		if (newRotation >= 360) {
			newRotation = 0
		}
		updateRotation({ index, value: newRotation })
	}

	render() {
		const { registerPhotos, index, rotations } = this.props
		return (
			<div className="row">
				<div className="col-lg-2 mb-3">
					<ImageUpload onDrop={this.handleImageUpload} />
				</div>
				<div className="col-lg-5 mb-3 d-flex justify-content-center">
					<div
						className="image-container"
						style={{
							transform: `rotate(${rotations[index]}deg)`
						}}
					>
						{registerPhotos[index] && (
							<img
								src={URL.createObjectURL(registerPhotos[index])}
								alt="img"
							/>
						)}
					</div>
				</div>
				<div className="col-lg-5 d-flex flex-column justify-content-end mb-3">
					{registerPhotos[index] && (
						<button
							onClick={() => this.rotate()}
							className="btn btn-outline-light mr-auto d-flex align-items-center justify-content-center"
						>
							<span className="fa fa-redo p-1" />
						</button>
					)}
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
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)
