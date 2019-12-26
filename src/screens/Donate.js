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
			<div className="mt-5 registration">
				<div className="px-0 px-md-4">
					<h4 className="text-uppercase h2 text-center mb-4">
						Donate
					</h4>
					<p>
						Some explanation text. Some explanation text. Some
						explanation text. Some explanation text.
					</p>
					<p>
						Some explanation text. Some explanation text. Some
						explanation text.
					</p>
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
