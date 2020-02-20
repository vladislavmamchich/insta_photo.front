import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { toast } from 'react-toastify'
import i18next from 'i18next'

import {
	a_setAuth,
	a_setHeightUnit,
	a_setWeightUnit,
	a_setLanguage
} from '../redux/actions'
import { languages } from '../constants'

import Select from './common/Select'

class Header extends PureComponent {
	logout = () => {
		const { setAuth } = this.props
		setAuth(false)
		localStorage.removeItem('auth')
	}
	changeHeightUnit = (e, unit) => {
		e.preventDefault()
		const { setHeightUnit } = this.props
		setHeightUnit(unit)
		localStorage.setItem('heightUnit', unit)
	}
	changeWeightUnit = (e, unit) => {
		e.preventDefault()
		const { setWeightUnit } = this.props
		setWeightUnit(unit)
		localStorage.setItem('weightUnit', unit)
	}
	render() {
		const {
			auth,
			profile: { heightUnit, weightUnit, language },
			setLanguage
		} = this.props
		return (
			<header className="page-header d-flex align-items-start flex-column flex-sm-row">
				<div className="logo mr-4">
					<Link to="/" title="Models" className="fam-fre">
						modelslogo
					</Link>
				</div>
				{auth && (
					<Link
						to="/"
						onClick={() => this.logout()}
						className="btn-link fam-fre font-weight-bold heading my-3 no-wrap"
					>
						{i18next.t('log out')}
					</Link>
				)}

				<div className="options d-flex flex-fill justify-content-end my-3 align-items-start">
					<div className="opts-group d-flex align-items-center mr-3 no-wrap">
						<a
							href="#!"
							onClick={e => this.changeWeightUnit(e, 'kg')}
							className={weightUnit === 'kg' ? 'active' : ''}
						>
							kg
						</a>
						<span className="font-gray"> / </span>
						<a
							href="#!"
							onClick={e => this.changeWeightUnit(e, 'lb')}
							className={weightUnit === 'lb' ? 'active' : ''}
						>
							lb
						</a>
					</div>
					<div className="opts-group d-flex align-items-center mr-3 no-wrap">
						<a
							href="#!"
							onClick={e => this.changeHeightUnit(e, 'cm')}
							className={heightUnit === 'cm' ? 'active' : ''}
						>
							cm
						</a>
						<span className="font-gray"> / </span>
						<a
							href="#!"
							onClick={e => this.changeHeightUnit(e, 'inch')}
							className={heightUnit === 'inch' ? 'active' : ''}
						>
							inch
						</a>
					</div>
					<Select
						width="95px"
						options={languages}
						onChange={lang => setLanguage(lang)}
						selected={language}
					/>
				</div>
			</header>
		)
	}
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.service.auth
})
const mapDispatchToProps = dispatch => ({
	setAuth: payload => dispatch(a_setAuth(payload)),
	setHeightUnit: payload => dispatch(a_setHeightUnit(payload)),
	setWeightUnit: payload => dispatch(a_setWeightUnit(payload)),
	setLanguage: payload => {
		dispatch(a_setLanguage(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
