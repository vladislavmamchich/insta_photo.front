import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { socket } from '../../utils/socket'
import { t_addToFavourites, t_removeFromFavourites } from '../../redux/tracks'
import { a_setModal } from '../../redux/actions'

import ModalUser from './ModalUser'

const { REACT_APP_SERVER } = process.env

class MainImage extends PureComponent {
	// state = {
	// 	loading: false
	// }
	// componentDidMount() {
	// 	const { loadImages, images, loadProfile, data } = this.props
	// 	const el = document.querySelector('.logo')
	// 	el.scrollIntoView({ block: 'start', behavior: 'smooth' })
	// 	if (!images) {
	// 		this.fetchImages(1)
	// 	}
	// }
	// fetchImages = async page => {
	// 	const { loadImages } = this.props
	// 	this.setState({ loading: true })
	// 	await loadImages({ page })
	// 	this.setState({ loading: false })
	// }
	like = async (e, image_id) => {
		e.preventDefault()
		e.stopPropagation()
		socket.emit('like', { image_id })
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
	isMeLike = e => {
		e.preventDefault()
		e.stopPropagation()
	}
	render() {
		const {
			data: { _id, main_photo },
			image,
			setModal
		} = this.props
		const is_me = image._id === main_photo._id
		const user_id = image.user._id
		return (
			<Link
				onClick={e => {
					e.preventDefault()
					return is_me
						? null
						: setModal({
								title: 'qwe',
								children: <ModalUser user_id={user_id} />
						  })
				}}
				to={`/user/${user_id}`}
				className={`product ${is_me ? 'active' : ''}`}
			>
				<div className="d-flex justify-content-between align-content-stretch meta">
					<div
						onClick={e =>
							is_me ? this.isMeLike(e) : this.like(e, image._id)
						}
						className="likes"
					>
						<span
							className={`${
								image.likes.includes(_id) ? 'fa' : 'far'
							} fa-heart`}
						/>
						<span className="text">{image.totalLikes}</span>
					</div>
					{!is_me && (
						<div onClick={e => this.favourite(e)} className="star">
							<span
								className={`${
									image.favourites.includes(_id)
										? 'fa'
										: 'far'
								} fa-star`}
							/>
						</div>
					)}
				</div>

				<img
					className="img-fluid"
					src={REACT_APP_SERVER + image.url}
					alt="img"
				/>
			</Link>
		)
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	modal: state.service.modal
})
const mapDispatchToProps = dispatch => ({
	addToFavourites: async payload => {
		await dispatch(t_addToFavourites(payload))
	},
	removeFromFavourites: async payload => {
		await dispatch(t_removeFromFavourites(payload))
	},
	setModal: payload => {
		dispatch(a_setModal(payload))
	}
})

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(MainImage)
)
