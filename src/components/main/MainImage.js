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
			data: { favourites }
		} = this.props
		if (favourites.includes(image._id)) {
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
			data: { _id, main_photo, favourites },
			image,
			setModal,
			totalLikes
		} = this.props
		const is_me = main_photo ? image._id === main_photo._id : false
		const user_id = is_me ? image.user : image.user._id
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
						<div className="d-flex">
							<span className="text" style={{ lineHeight: 1.8 }}>
								=
							</span>
							<span className="text">{totalLikes[user_id]}</span>
						</div>
					</div>
					{!is_me && (
						<div onClick={e => this.favourite(e)} className="star">
							<span
								className={`${
									favourites.includes(image._id)
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
	modal: state.service.modal,
	totalLikes: state.users.totalLikes
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
