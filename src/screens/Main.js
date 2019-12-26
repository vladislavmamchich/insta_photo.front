import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

// import { t_login } from '../../redux/tracks'
import Select from '../components/common/Select'

class Main extends PureComponent {
	componentDidMount() {
		const el = document.querySelector('.logo')
		el.scrollIntoView({ block: 'start', behavior: 'smooth' })
	}
	render() {
		const { history } = this.props
		return (
			<Fragment>
				<div className="d-flex justify-content-start">
					<div className="prod-options d-flex flex-column flex-md-row">
						<div className="d-flex flex-column justify-content-start mr-5">
							<button className="btn-link active text-left">
								show me
							</button>
							<button className="btn-link text-left">
								show favourites
							</button>
							<button className="btn-link text-left">
								clear filters
							</button>
						</div>
						<div className="d-flex flex-row justify-content-start flex-wrap mr-5">
							<div className="mr-2">
								<Select type="countries" width="130px" />
								<Select type="regions" />
								<Select type="localities" />
							</div>
							<div>
								<Select type="nationalities" width="150px" />
								<Select type="ages" width="90px" />
							</div>
						</div>
						<div className="d-flex flex-row justify-content-start">
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '1fr 1fr'
								}}
							>
								<div className="custom-checkbox mr-2">
									<label>
										<input type="checkbox" />
										<span className="checkbox-icon" />
										<span className="ml-2">likes</span>
									</label>
								</div>
								<div className="custom-checkbox mr-2">
									<label>
										<input type="checkbox" />
										<span className="checkbox-icon" />
										<span className="ml-2">chest</span>
									</label>
								</div>
								<div className="custom-checkbox mr-2">
									<label>
										<input type="checkbox" />
										<span className="checkbox-icon" />
										<span className="ml-2">heihgt</span>
									</label>
								</div>
								<div className="custom-checkbox mr-2">
									<label>
										<input type="checkbox" />
										<span className="checkbox-icon" />
										<span className="ml-2">weist</span>
									</label>
								</div>
								<div className="custom-checkbox mr-2">
									<label>
										<input type="checkbox" />
										<span className="checkbox-icon" />
										<span className="ml-2">weight</span>
									</label>
								</div>
								<div className="custom-checkbox mr-2">
									<label>
										<input type="checkbox" />
										<span className="checkbox-icon" />
										<span className="ml-2">thighs</span>
									</label>
								</div>
							</div>
							<div className="d-flex flex-column align-content-stretch mb-2 ml-2">
								<a href="#!" className="active">
									<span className="fa fa-chevron-up" />
								</a>
								<div className="flex-fill" />
								<a href="#!">
									<span className="fa fa-chevron-down" />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="products-container mt-4">
					<div
						onClick={() => history.push('/user')}
						className="product"
					>
						<div className="d-flex justify-content-between align-content-stretch meta">
							<div className="likes">
								<span className="far fa-heart" />
								<span className="text">20000000</span>
							</div>
							<div className="star">
								<span className="far fa-star" />
							</div>
						</div>
					</div>
					<div className="product">
						<div className="d-flex justify-content-between align-content-stretch meta">
							<div className="likes">
								<span className="fa fa-heart" />
								<span className="text">200</span>
							</div>
							<div className="star">
								<span className="fa fa-star" />
							</div>
						</div>
						<img
							className="img-fluid"
							src="http://lorempixel.com/800/800"
							alt="img"
						/>
					</div>
					<div className="product">
						<div className="d-flex justify-content-between align-content-stretch meta">
							<div className="likes">
								<span className="fa fa-heart" />
								<span className="text">200</span>
							</div>
							<div className="star">
								<span className="fa fa-star" />
							</div>
						</div>
						<img
							className="img-fluid"
							src="http://lorempixel.com/600/600"
							alt="img"
						/>
					</div>
					<div className="product">
						<div className="d-flex justify-content-between align-content-stretch meta">
							<div className="likes">
								<span className="fa fa-heart" />
								<span className="text">200</span>
							</div>
							<div className="star">
								<span className="fa fa-star" />
							</div>
						</div>
					</div>
					<div className="product">
						<div className="d-flex justify-content-between align-content-stretch meta">
							<div className="likes">
								<span className="fa fa-heart" />
								<span className="text">200</span>
							</div>
							<div className="star">
								<span className="fa fa-star" />
							</div>
						</div>
					</div>
					<div className="product">
						<div className="d-flex justify-content-between align-content-stretch meta">
							<div className="likes">
								<span className="fa fa-heart" />
								<span className="text">200</span>
							</div>
							<div className="star">
								<span className="fa fa-star" />
							</div>
						</div>
					</div>
					<div className="product">
						<div className="d-flex justify-content-between align-content-stretch meta">
							<div className="likes">
								<span className="fa fa-heart" />
								<span className="text">200</span>
							</div>
							<div className="star">
								<span className="fa fa-star" />
							</div>
						</div>
					</div>
					<div className="product">
						<div className="d-flex justify-content-between align-content-stretch meta">
							<div className="likes">
								<span className="fa fa-heart" />
								<span className="text">200</span>
							</div>
							<div className="star">
								<span className="fa fa-star" />
							</div>
						</div>
					</div>
					<div className="product">
						<div className="d-flex justify-content-between align-content-stretch meta">
							<div className="likes">
								<span className="fa fa-heart" />
								<span className="text">200</span>
							</div>
							<div className="star">
								<span className="fa fa-star" />
							</div>
						</div>
					</div>
				</div>
				<button className="btn-link mx-auto d-block fam-fre font-28 mt-5 mb-3">
					load more...
				</button>
			</Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)
