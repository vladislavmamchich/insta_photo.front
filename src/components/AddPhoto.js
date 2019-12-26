import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

// import { t_login } from '../../redux/tracks'
// import Button from '../components/common/Button'
// import Select from '../components/common/Select'

// const addPhoto = key => (
// 	<div key={key} className="row">
// 		<div className="col-lg-2 mb-3">
// 			<label className="btn btn-outline-light">
// 				<span>choose...</span>
// 				<input type="file" className="d-none" />
// 			</label>
// 		</div>
// 		<div className="col-lg-3 mb-3">
// 			<img
// 				src="http://lorempixel.com/500/600"
// 				className="img-fluid mx-auto d-block"
// 				alt="models"
// 			/>
// 		</div>
// 		<div className="col-lg-7 d-flex flex-column justify-content-end mb-3">
// 			<button className="btn btn-outline-light mr-auto d-flex align-items-center justify-content-center">
// 				<span className="fa fa-redo p-1" />
// 			</button>
// 		</div>
// 	</div>
// )

class AddPhoto extends PureComponent {
	render() {
		return (
			<div className="row">
				<div className="col-lg-2 mb-3">
					<label className="btn btn-outline-light">
						<span>choose...</span>
						<input type="file" className="d-none" />
					</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)
