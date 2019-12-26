import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

// import { t_login } from '../../redux/tracks'
// import Select from '../../components/common/Select'

class Favourites extends PureComponent {
	render() {
		return (
			<div className="tab-pane fade show active">
				<div className="favourites">
					<div className="product">
						<div className="d-flex justify-content-end align-content-stretch meta">
							<div className="star">
								<span className="far fa-star" />
							</div>
						</div>
						<img
							className="img-fluid"
							src="http://lorempixel.com/600/600"
							alt="img"
						/>
					</div>
					{Array.from(Array(10).keys()).map(id => (
						<div key={id} className="product">
							<div className="d-flex justify-content-end align-content-stretch meta">
								<div className="star">
									<span className="far fa-star" />
								</div>
							</div>
						</div>
					))}
				</div>
				<button className="btn-link mx-auto d-block fam-fre font-28 mb-3 mt-5">
					load more...
				</button>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)
