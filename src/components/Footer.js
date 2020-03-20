import React, { PureComponent } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import i18next from 'i18next'

class Footer extends PureComponent {
	render() {
		return (
			<footer className="d-flex my-3">
				<span className="fam-fre position-absolute">(c) somename</span>
				<div className="mx-auto fam-fre">
					<a href="/terms" target="_blank">
						Terms of Use
					</a>
					<span>&nbsp;|&nbsp;</span>
					<a href="/privacy" target="_blank">
						Privacy Policy
					</a>
				</div>
			</footer>
		)
	}
}

const mapStateToProps = state => ({
	language: state.profile.language
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
