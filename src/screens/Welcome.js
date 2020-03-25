import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import i18next from 'i18next'

import { t_subscribe } from '../redux/tracks'

import Button from '../components/common/Button'

class Welcome extends PureComponent {
	state = {
		subscribing: false
	}
	subscribe = async () => {
		const { history, subscribe } = this.props
		try {
			await subscribe()
			history.push('/profile')
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const { history } = this.props
		const { subscribing } = this.state
		return (
			<div className="container d-flex flex-column align-items-center justify-content-center">
				<div className="w-75 text-center mt-5">
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book. It has survived not only five centuries,
					but also the leap into electronic typesetting.
				</div>
				<h1 className="my-4">{i18next.t('how to use')}</h1>
				<div className="d-flex align-items-center justify-content-center w-75 row">
					<div className="col-lg-5 col-sm-10 col-12 welcome-block">
						<div className="title">{i18next.t('observer')}</div>
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
							className="mt-2"
							label={i18next.t('subscribe')}
							loading={subscribing}
						/>
					</div>
					<div className="col-lg-1 col-md-12 title-font text-uppercase text-center">
						{i18next.t('or')}
					</div>
					<div className="col-lg-5 col-sm-10 col-12 welcome-block">
						<div className="title">{i18next.t('participant')}</div>
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
							className="mt-2"
							label={i18next.t('join us')}
						/>
					</div>
				</div>
				<div className="mt-3">
					<Link className="text-uppercase" to="/login">
						{i18next.t('log in')}
					</Link>{' '}
					{i18next.t('if already registered')}
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
	subscribe: async payload => {
		await dispatch(t_subscribe(payload))
	}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome))
