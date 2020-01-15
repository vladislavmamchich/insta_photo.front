import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { t_loadCaptcha } from '../../redux/tracks'

class Captcha extends PureComponent {
	state = {
		loading: false
	}

	getCaptcha = async () => {
		this.setState({ loading: true })
		const { loadCaptcha } = this.props
		await loadCaptcha()
		const el = document.getElementById('captcha')
		if (el.firstChild) {
			el.removeChild(el.firstChild)
		}
		const captcha = new DOMParser().parseFromString(
			this.props.captcha,
			'image/svg+xml'
		)
		el.appendChild(
			el.ownerDocument.importNode(captcha.documentElement, true)
		)
		this.setState({ loading: false })
	}

	componentDidMount() {
		this.getCaptcha()
	}

	render() {
		const { loading } = this.state
		return (
			<div className="captcha">
				<div id="captcha" />
				<div
					onClick={() => this.getCaptcha()}
					className="d-flex justify-content-center w-100 pointer"
				>
					<FontAwesomeIcon icon={faSpinner} spin={loading} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	captcha: state.service.captcha
})
const mapDispatchToProps = dispatch => ({
	loadCaptcha: async payload => {
		await dispatch(t_loadCaptcha(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Captcha)
