import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import i18next from 'i18next'

import {
	t_loadUser,
	t_addToFavourites,
	t_removeFromFavourites
} from '../redux/tracks'
import { a_setUserInfo } from '../redux/actions'
import { socket } from '../utils/socket'
import { weightConverter, heightConverter } from '../utils/helpers'

import Loader from '../components/service/Loader'
import Carousel from '../components/common/Carousel'

const User = props => {
	const { match, user_id, history, location } = props

	const dispatch = useDispatch()
	const [index, setSelectedIndex] = useState(0)
	useEffect(() => {
		if (user_id >= 0) {
			dispatch(t_loadUser(user_id))
		} else if (match && match.params && match.params.id >= 0) {
			dispatch(t_loadUser(match.params.id))
		} else {
			history.push('/')
		}
		return () => {
			dispatch(a_setUserInfo(null))
		}
	}, [user_id, dispatch, history, match])
	const { user } = useSelector(store => store.users)
	const { heightUnit, weightUnit, data } = useSelector(store => store.profile)

	const like = async image_id => {
		socket.emit('like', { image_id })
		if (user.images[index].likes.includes(data._id)) {
			user.images[index].likes = user.images[index].likes.filter(
				i => i !== data._id
			)
		} else {
			user.images[index].likes.push(data._id)
		}
		dispatch(a_setUserInfo({ ...user, images: user.images }))
	}
	const favourite = async () => {
		if (data.favourites.includes(user.images[index]._id)) {
			dispatch(
				t_removeFromFavourites({
					image: user.images[index]
				})
			)
		} else {
			dispatch(
				t_addToFavourites({
					image: user.images[index]
				})
			)
			if (!user.images[index].likes.includes(data._id)) {
				user.images[index].likes.push(data._id)
				socket.emit('like', { image_id: user.images[index]._id })
			}
		}
		dispatch(a_setUserInfo({ ...user, images: user.images }))
	}
	if (user) {
		const {
			height,
			weight,
			chest,
			waist,
			thighs,
			country,
			region,
			nationality,
			age,
			operations,
			created_at,
			_id,
			images,
			height_unit,
			weight_unit
		} = user
		const is_me = _id === data._id
		const in_favourites = data.favourites.includes(images[index]._id)
		const regionLabel = country === 6252001 ? 'State' : 'Region'
		const image_id = location
			? new URLSearchParams(location.search).get('image_id')
			: 0
		const image_index = images.findIndex(i => +i._id === +image_id)
		return (
			<div className="product-overview position-relative">
				<div className="d-flex align-items-center justify-content-between top-line">
					<p className="font-20">
						{i18next.t('User')} #{_id}
					</p>
					<p className="font-20">
						{i18next.t('User')} #{_id}
					</p>
				</div>
				<div className="d-flex justify-content-center">
					<div
						style={{ width: '460px' }}
						className="d-flex justify-content-between mb-3 center-item"
					>
						<div
							onClick={e =>
								is_me
									? e.stopPropagation()
									: like(images[index]._id)
							}
							className="likes"
						>
							<span
								className={`${
									images[index].likes.includes(data._id)
										? 'fa'
										: 'far'
								} fa-heart`}
							/>
							<span className="text">
								+{images[index].likes.length}
							</span>
						</div>
						{!is_me && (
							<div
								onClick={() => favourite()}
								className="star px-2"
							>
								<span
									className={`${
										in_favourites ? 'fa' : 'far'
									} fa-star`}
								/>
							</div>
						)}
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-12">
						<Carousel
							images={images}
							setSelectedImage={index => setSelectedIndex(index)}
							index={image_index}
						/>
					</div>
				</div>
				<div className="overview-details mt-5 d-flex flex-column flex-xl-row justify-content-center">
					<div className="d-flex flex-wrap p-2 wrapper">
						<div className="mr-3">
							<p className="mb-1">
								{i18next.t('Country')}: {country}
							</p>
							<p className="mb-1">
								{regionLabel}: {region}
							</p>
						</div>
						<div className="mr-3">
							<p className="mb-1">
								{i18next.t('Nationality')}: {nationality}
							</p>
						</div>
					</div>
					<div className="d-flex flex-wrap p-2 wrapper center">
						<div className="mr-3">
							<p className="mb-1">
								{i18next.t('Age')}: {age}
							</p>
							<p className="mb-1 text-capitalize">
								{i18next.t('weight')}:{' '}
								{weightConverter(
									weight,
									weight_unit,
									weightUnit
								)}{' '}
								{weightUnit}
							</p>
						</div>
						<div className="mr-3">
							<p className="mb-1 text-capitalize">
								{i18next.t('height')}:{' '}
								{heightConverter(
									height,
									height_unit,
									heightUnit
								)}{' '}
								{heightUnit}
							</p>
							<p className="mb-1 text-capitalize">
								{i18next.t('chest')}:{' '}
								{heightConverter(
									chest,
									height_unit,
									heightUnit
								)}{' '}
								{heightUnit}
							</p>
						</div>
						<div className="mr-3">
							<p className="mb-1 text-capitalize">
								{i18next.t('waist')}:{' '}
								{heightConverter(
									waist,
									height_unit,
									heightUnit
								)}{' '}
								{heightUnit}
							</p>
							<p className="mb-1 text-capitalize">
								{i18next.t('thighs')}:{' '}
								{heightConverter(
									thighs,
									height_unit,
									heightUnit
								)}{' '}
								{heightUnit}
							</p>
						</div>
					</div>
					<div className="d-flex flex-wrap p-2 wrapper">
						<div className="mr-3">
							<p className="mb-1">
								{i18next.t('Operations')}:{' '}
								{operations ? 'yes' : 'no'}
							</p>
							<p className="mb-1">
								{i18next.t('Registration date')}:{' '}
								{moment(created_at).format('DD/MM/YYYY')}
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return <Loader />
	}
}

export default User
