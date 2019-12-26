import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import i18next from 'i18next'

class NotFound extends PureComponent {
	render() {
		return (
			<div className="d-flex align-items-center justify-content-center h-100vh">
				<h1>{i18next.t('Page not found')}</h1>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	language: state.profile.language
})

export default connect(mapStateToProps)(NotFound)
