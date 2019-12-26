import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { t_login } from '../redux/tracks'

import Button from '../components/common/Button'

class Welcome extends PureComponent {
	subscribe = async () => {
		const { history, login } = this.props
		await login()
		history.push('/main')
	}
	render() {
		const { history } = this.props
		return (
			<div className="d-flex flex-column align-items-center justify-content-center">
				<div className="w-75 text-center mt-5">
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book. It has survived not only five centuries,
					but also the leap into electronic typesetting.
				</div>
				<h1 className="my-4">how to use</h1>
				<div className="d-flex align-items-center justify-content-center w-75 row">
					<div className="col-xl-5 col-sm-10 col-12 welcome-block">
						<div className="title">observer</div>
						<div className="d-flex justify-content-between w-100">
							<div className="m-2">
								<FontAwesomeIcon icon={faCheck} />
								<span>some text</span>
							</div>
							<div className="m-2">
								<FontAwesomeIcon icon={faCheck} />
								<span>some text</span>
							</div>
						</div>
						<div className="d-flex justify-content-between w-100">
							<div className="m-2">
								<FontAwesomeIcon icon={faCheck} />
								<span>some text</span>
							</div>
							<div className="m-2">
								<FontAwesomeIcon icon={faCheck} />
								<span>some text</span>
							</div>
						</div>
						<div className="d-flex justify-content-between w-100">
							<div className="m-2">
								<FontAwesomeIcon icon={faCheck} />
								<span>
									some textsome textsome textsome text
								</span>
							</div>
						</div>
						<div className="text-center">
							lorem Ipsum is simply dummy text of the printing and
							typesetting industry
						</div>
						<Button
							onClick={() => this.subscribe()}
							className="mt-2 w-50"
							label="subscribe"
						/>
					</div>
					<div className="col-xl-2 title-font text-uppercase text-center">
						or
					</div>
					<div className="col-xl-5 col-sm-10 col-12 welcome-block">
						<div className="title">participant</div>
						<div className="d-flex justify-content-between w-100">
							<div>
								<FontAwesomeIcon icon={faCheck} />
								<span>some text</span>
							</div>
						</div>
						<div className="m-3 title-font text-uppercase">+</div>
						<div className="d-flex justify-content-between w-100">
							<div className="m-2">
								<FontAwesomeIcon icon={faCheck} />
								<span>some text</span>
							</div>
							<div className="m-2">
								<FontAwesomeIcon icon={faCheck} />
								<span>some text</span>
							</div>
						</div>
						<div className="text-center">
							lorem Ipsum is simply dummy text of the printing.
						</div>
						<Button
							onClick={() => history.push('/register')}
							className="mt-2 w-50"
							label="join us"
						/>
					</div>
				</div>
				<div className="mt-3">
					<Link className="text-uppercase" to="/login">
						log in
					</Link>{' '}
					if already registered
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
	login: async payload => {
		await dispatch(t_login(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
