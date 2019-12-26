import React, { Component } from 'react'
import { connect } from 'react-redux'
import i18next from 'i18next'

class ServerError extends Component {
	reload = e => {
		e.preventDefault()
		window.location.reload()
	}

	render() {
		return (
			<div className="d-flex align-items-center justify-content-center flex-column h-100vh">
				<h3>{i18next.t('Apparently, an error occurred')}.</h3>
				<h2>
					{i18next.t('Try')}{' '}
					<a onClick={e => this.reload(e)} href="#!">
						{i18next.t('refresh the page')}.
					</a>
				</h2>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	language: state.profile.language
})

export default connect(mapStateToProps)(ServerError)
