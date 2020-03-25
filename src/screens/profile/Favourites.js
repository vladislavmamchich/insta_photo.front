import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
import i18next from 'i18next'

import { t_favouritesFromPage } from '../../redux/tracks'

import FavouriteImage from '../../components/profile/FavouriteImage'
import Loader from '../../components/service/Loader'

class Favourites extends PureComponent {
	state = {
		loading: false
	}
	fetchImages = async page => {
		const { loadFavourites } = this.props
		this.setState({ loading: true })
		await loadFavourites({ page })
		this.setState({ loading: false })
	}
	componentDidMount() {
		// const { favourites } = this.props
		// if (!favourites || (favourites && favourites.docs.length)) {
		this.fetchImages(1)
		// }
	}
	render() {
		const { favourites } = this.props
		const { loading } = this.state
		if (favourites) {
			return (
				<div className="tab-pane fade show active">
					{favourites.docs.length ? (
						<Fragment>
							<InfiniteScroll
								dataLength={favourites.docs.length}
								next={() =>
									this.fetchImages(favourites.nextPage)
								}
								hasMore={favourites.hasNextPage}
								className="favourites"
							>
								{favourites.docs.map((i, index) =>
									i.original ? (
										<FavouriteImage key={index} image={i} />
									) : null
								)}
							</InfiniteScroll>
							{loading && (
								<div className="d-flex justify-content-center align-items-center mt-4">
									<h4>{i18next.t('Loading')}...</h4>
								</div>
							)}
						</Fragment>
					) : (
						<div style={{ height: '50vh' }}>
							{i18next.t('No favourites')}
						</div>
					)}
				</div>
			)
		} else {
			return <Loader containerStyle={{ height: '50vh' }} />
		}
	}
}

const mapStateToProps = state => ({
	favourites: state.profile.favourites,
	language: state.profile.language
})
const mapDispatchToProps = dispatch => ({
	loadFavourites: async payload => {
		await dispatch(t_favouritesFromPage(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)
