import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { t_removeFromFavourites } from '../../redux/tracks'

const { REACT_APP_SERVER } = process.env

class FavouriteImage extends PureComponent {
	state = {
		in_favourites: true
	}
	favourite = async e => {
		e.preventDefault()
		e.stopPropagation()
		if (this.state.in_favourites) {
			this.setState({ in_favourites: false })
		} else {
			this.setState({ in_favourites: true })
		}
	}

	componentDidMount() {
		window.addEventListener('beforeunload', this.onBeforeUnload)
	}

	onBeforeUnload = e => {
		e.preventDefault()
		if (!this.state.in_favourites) {
			const { removeFromFavourites, image } = this.props
			removeFromFavourites({ image: image.original })
		}
		// e.returnValue = `Are you sure you want to leave?`
	}

	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.onBeforeUnload)
		if (!this.state.in_favourites) {
			const { removeFromFavourites, image } = this.props
			removeFromFavourites({ image: image.original })
		}
	}

	render() {
		const { image } = this.props
		const { in_favourites } = this.state
		return (
			<div
				onClick={() =>
					window.open(
						`/user/${image.original.user}?image_id=${image.original._id}`,
						`${new Date()}`,
						'left=20'
					)
				}
				className="product"
			>
				<div className="d-flex justify-content-end align-content-stretch meta">
					<div onClick={e => this.favourite(e)} className="star">
						<span
							className={`${
								in_favourites ? 'fa' : 'far'
							} fa-star`}
						/>
					</div>
				</div>
				<img
					className="img-fluid"
					src={REACT_APP_SERVER + image.original.url}
					alt="img"
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loading: state.service.loading,
	language: state.profile.language,
	data: state.profile.data
})
const mapDispatchToProps = dispatch => ({
	removeFromFavourites: async payload => {
		await dispatch(t_removeFromFavourites(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteImage)
