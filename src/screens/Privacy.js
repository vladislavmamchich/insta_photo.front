import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

// import { t_login } from '../../redux/tracks'

class Privacy extends PureComponent {
	render() {
		return (
			<div className="d-flex align-items-center justify-content-center">
				<h1>Privacy Policy page</h1>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	language: state.profile.language
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Privacy)
