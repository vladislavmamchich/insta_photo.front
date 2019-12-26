import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { a_setAuth } from '../redux/actions'
import { languages } from '../constants'

import Select from './common/Select'

class Header extends PureComponent {
	state = {
		weight: 'kg',
		metre: 'cm'
	}
	render() {
		const { setAuth, auth } = this.props
		const { weight, metre } = this.state
		return (
			<header className="page-header d-flex align-items-start flex-column flex-sm-row">
				<div className="logo mr-4">
					<a href="/" title="Models" className="fam-fre">
						modelslogo
					</a>
				</div>
				{auth && (
					<Link
						to="/"
						onClick={() => setAuth(false)}
						className="btn-link fam-fre font-weight-bold heading my-3 no-wrap"
					>
						log out
					</Link>
				)}

				<div className="options d-flex flex-fill justify-content-end my-3 align-items-start">
					<div className="opts-group d-flex align-items-center mr-3 no-wrap">
						<a
							href="#!"
							onClick={() => this.setState({ weight: 'kg' })}
							className={weight === 'kg' ? 'active' : ''}
						>
							kg
						</a>
						<span className="font-gray"> / </span>
						<a
							href="#!"
							onClick={() => this.setState({ weight: 'lb' })}
							className={weight === 'lb' ? 'active' : ''}
						>
							lb
						</a>
					</div>
					<div className="opts-group d-flex align-items-center mr-3 no-wrap">
						<a
							href="#!"
							onClick={() => this.setState({ metre: 'cm' })}
							className={metre === 'cm' ? 'active' : ''}
						>
							cm
						</a>
						<span className="font-gray"> / </span>
						<a
							href="#!"
							onClick={() => this.setState({ metre: 'inch' })}
							className={metre === 'inch' ? 'active' : ''}
						>
							inch
						</a>
					</div>
					<Select width="95px" options={languages} />
				</div>
			</header>
		)
	}
}

const mapStateToProps = state => ({
	language: state.profile.language,
	auth: state.service.auth
})
const mapDispatchToProps = dispatch => ({
	setAuth: payload => dispatch(a_setAuth(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
