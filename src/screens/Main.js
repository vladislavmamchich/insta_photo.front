import React, { useEffect, useState, Fragment } from 'react'
// import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { t_images, t_getCountries } from '../redux/tracks'
import { weightConverter, heightConverter } from '../utils/helpers'

import Filters from '../components/main/Filters'
import MainImage from '../components/main/MainImage'
import Loader from '../components/service/Loader'

const Main = () => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const {
		data: { main_photo, _id }
	} = useSelector(store => store.profile)
	const {
		images,
		filter: {
			showMe,
			showFavourites,
			sort,
			order,
			age,
			country,
			nationality,
			region,
			locality
		}
	} = useSelector(store => store.users)
	const fetchImages = async page => {
		setLoading(true)
		await dispatch(await t_images({ page }))
		setLoading(false)
	}
	useEffect(() => {
		const el = document.querySelector('.logo')
		el.scrollIntoView({ block: 'start', behavior: 'smooth' })
		// if (!images) {
		fetchImages(1)
		// }
	}, [])
	useEffect(() => {
		dispatch(t_getCountries())
	}, [])
	const byDate = (a, b) => {
		const dateA = new Date(a.created_at),
			dateB = new Date(b.created_at)
		if (order === -1) {
			return dateB - dateA
		}
		return dateA - dateB
	}

	const byLikesCount = (a, b) => {
		const count1 = a.totalLikes,
			count2 = b.totalLikes
		if (order === -1) {
			return count2 - count1
		}
		return count1 - count2
	}
	const byChest = (a, b) => {
		const chest1 = a.user.chest,
			chest2 = b.user.chest
		if (order === -1) {
			return chest2 - chest1
		}
		return chest1 - chest2
	}
	const byHeight = (a, b) => {
		const height1 = a.user.height,
			height2 = b.user.height
		if (order === -1) {
			return height2 - height1
		}
		return height1 - height2
	}
	const byWeight = (a, b) => {
		const weight1 = a.user.weight,
			weight2 = b.user.weight
		if (order === -1) {
			return weight2 - weight1
		}
		return weight1 - weight2
	}
	const byWaist = (a, b) => {
		const waist1 = a.user.waist,
			waist2 = b.user.waist
		if (order === -1) {
			return waist2 - waist1
		}
		return waist1 - waist2
	}
	const byThighs = (a, b) => {
		const thighs1 = a.user.thighs,
			thighs2 = b.user.thighs
		if (order === -1) {
			return thighs2 - thighs1
		}
		return thighs1 - thighs2
	}

	const getSorted = list => {
		list = list.map(i => {
			return {
				...i,
				user: {
					...i.user,
					chest: heightConverter(
						i.user.chest,
						i.user.height_unit,
						'cm'
					),
					height: heightConverter(
						i.user.height,
						i.user.height_unit,
						'cm'
					),
					weight: weightConverter(
						i.user.weight,
						i.user.weight_unit,
						'kg'
					),
					waist: heightConverter(
						i.user.waist,
						i.user.height_unit,
						'cm'
					),
					thighs: heightConverter(
						i.user.thighs,
						i.user.height_unit,
						'cm'
					)
				}
			}
		})
		switch (sort) {
			case 'likes':
				return list.sort(byLikesCount)
			case 'chest':
				return list.sort(byChest)
			case 'height':
				return list.sort(byHeight)
			case 'weight':
				return list.sort(byWeight)
			case 'waist':
				return list.sort(byWaist)
			case 'thighs':
				return list.sort(byThighs)
			default:
				return list.sort(byDate)
		}
	}
	if (images) {
		if (images.docs.length) {
			let list = showFavourites
				? images.docs.filter(
						i => i.is_main && i.favourites.includes(_id)
				  )
				: images.docs
			// list = showMe
			// 	? [main_photo, ...list.filter(i => i._id !== main_photo._id)]
			// 	: list
			list =
				country !== 'all'
					? list.filter(i => i.user.country === country)
					: list
			list =
				region !== 'all'
					? list.filter(i => i.user.region === region)
					: list
			list =
				locality !== 'all'
					? list.filter(i => i.user.locality === locality)
					: list
			list =
				nationality !== 'all'
					? list.filter(i => i.user.nationality === nationality)
					: list
			list = age !== 'all' ? list.filter(i => +i.user.age === +age) : list
			list = showMe ? [main_photo, ...getSorted(list)] : getSorted(list)
			return (
				<Fragment>
					<div className="d-flex justify-content-start">
						<Filters />
					</div>
					<InfiniteScroll
						dataLength={images.limit}
						next={() => fetchImages(images.nextPage)}
						hasMore={images.hasNextPage}
						className="products-container mt-4"
					>
						{list.length ? (
							list.map((i, index) => (
								<MainImage
									key={index}
									image={i}
									index={index}
								/>
							))
						) : (
							<div>Not found</div>
						)}
					</InfiniteScroll>
					{loading && (
						<div className="d-flex justify-content-center align-items-center mt-4">
							<h4>Loading...</h4>
						</div>
					)}
				</Fragment>
			)
		} else {
			return <div>Not images yet</div>
		}
	} else {
		return <Loader containerStyle={{ height: '50vh' }} />
	}
}
export default Main
