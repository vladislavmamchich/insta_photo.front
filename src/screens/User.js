import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

// import { t_login } from '../../redux/tracks'
// import Button from '../components/common/Button'

class Register extends PureComponent {
	render() {
		return (
			<div className="product-overview position-relative">
				<div className="d-flex align-items-center justify-content-between top-line">
					<p className="font-20">User #1</p>
					<p className="font-20">User #1</p>
				</div>
				<div className="row mt-3">
					<div className="col-xl-3 col-lg-4 justify-content-center mt-3 mt-md-3 d-flex side-item align-items-center">
						<img
							src="http://lorempixel.com/200/200"
							alt="photo1"
							className="img-fluid overview-image"
						/>
					</div>
					<div className="col-xl-6 col-lg-4 mt-3 mt-md-3 center-item">
						<div className="d-flex justify-content-between align-content-stretch mb-3">
							<div className="likes">
								<span className="far fa-heart" />
								<span className="text">20000000</span>
							</div>
							<div className="star px-2">
								<span className="far fa-star" />
							</div>
						</div>
						<img
							src="http://lorempixel.com/400/600"
							alt="photo1"
							className="img-fluid overview-image"
						/>
					</div>
					<div className="col-xl-3 col-lg-4 justify-content-center mt-3 mt-md-3 d-flex side-item align-items-center">
						<img
							src="http://lorempixel.com/200/200"
							alt="photo1"
							className="img-fluid overview-image"
						/>
					</div>
				</div>
				<div className="overview-details mt-5 d-flex flex-column flex-xl-row justify-content-center">
					<div className="d-flex flex-wrap flex-md-nowrap p-2 wrapper">
						<div className="mr-3">
							<p className="mb-1">Country: Ukraine</p>
							<p className="mb-1">Region: Kyiv</p>
						</div>
						<div className="mr-3">
							<p className="mb-1">Locality: Kiev</p>
							<p className="mb-1">Nationality: Ukraine</p>
						</div>
					</div>
					<div className="d-flex flex-wrap flex-md-nowrap p-2 wrapper center">
						<div className="mr-3">
							<p className="mb-1">Age: 23</p>
							<p className="mb-1">Weight: 67 kg</p>
						</div>
						<div className="mr-3">
							<p className="mb-1">Height: 167 cm</p>
							<p className="mb-1">Chest: 67 cm</p>
						</div>
						<div className="mr-3">
							<p className="mb-1">Weist: 167 cm</p>
							<p className="mb-1">Thigs: 67 cm</p>
						</div>
					</div>
					<div className="d-flex flex-wrap flex-md-nowrap p-2 wrapper">
						<div className="mr-3">
							<p className="mb-1">Operations: no</p>
							<p className="mb-1">
								Registration date: 01/01/2019
							</p>
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
