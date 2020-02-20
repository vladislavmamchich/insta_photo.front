import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { t_addToFavourites, t_removeFromFavourites } from '../../redux/tracks'

import Window from '../../components/common/Window'
import User from '../../screens/User'

const { REACT_APP_SERVER } = process.env

class FavouriteImage extends PureComponent {
	state = {
		open: false
	}
	favourite = async e => {
		e.preventDefault()
		e.stopPropagation()
		const {
			addToFavourites,
			removeFromFavourites,
			image,
			data: { _id }
		} = this.props
		if (image.favourites.includes(_id)) {
			removeFromFavourites({ image })
		} else {
			addToFavourites({ image })
		}
	}
	render() {
		const {
			image,
			data: { _id }
		} = this.props
		const { open } = this.state
		return (
			<div
				onClick={() => this.setState({ open: true })}
				className="product"
			>
				<div className="d-flex justify-content-end align-content-stretch meta">
					<div onClick={e => this.favourite(e)} className="star">
						<span
							className={`${
								image.favourites.includes(_id) ? 'fa' : 'far'
							} fa-star`}
						/>
					</div>
				</div>
				<img
					className="img-fluid"
					src={REACT_APP_SERVER + image.url}
					alt="img"
				/>
				{open && (
					<Window
						url={`/user/${image.user._id}?image_id=${image._id}`}
						onUnload={() => this.setState({ open: false })}
					>
						<User user_id={image.user._id} image_id={image._id} />
					</Window>
				)}
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
	addToFavourites: async payload => {
		await dispatch(t_addToFavourites(payload))
	},
	removeFromFavourites: async payload => {
		await dispatch(t_removeFromFavourites(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteImage)
