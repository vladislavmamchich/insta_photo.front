import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import styled from 'styled-components'
import { t_loadUserInfo, t_userModeration } from '../../redux/tracks'
import { getGeonames } from '../../constants'

import Button from '../../components/common/Button'
import UserPhoto from './UserPhoto'

const geonames = getGeonames()

const AdminUserInfo = props => {
	const {
		match: { params },
		history
	} = props
	const dispatch = useDispatch()
	const user = useSelector(store => store.users.user)
	const store = useStore()

	const [loading, setLoading] = useState(false)
	const [country, setCountry] = useState('')
	const [region, setRegion] = useState('')
	const [nationality, setNationality] = useState('')

	const loadUserInfo = async () => {
		await dispatch(t_loadUserInfo({ user_id: params.id }))
		const { country, nationality, region } = store.getState().users.user
		const countries = await geonames.countryInfo({})
		const countryObj = countries.geonames.find(
			c => +c.geonameId === +country
		)
		const regions = await geonames.children({
			geonameId: countryObj.geonameId
		})
		const regionObj = regions.geonames.find(r => +r.geonameId === +region)
		setCountry(countryObj.countryName)
		setNationality(
			countries.geonames.find(c => +c.geonameId === +nationality)
				.countryName
		)
		setRegion(regionObj.name)
	}

	useEffect(() => {
		loadUserInfo().catch(err => history.push('/admin'))
	}, [history])

	const userModeration = async ({ user_id, moderated }) => {
		setLoading(true)
		await dispatch(t_userModeration({ user_id, moderated }))
		setLoading(false)
	}

	if (user) {
		const {
			_id,
			is_active,
			moderated,
			email,
			nickname,
			age,
			sex,
			height,
			chest,
			waist,
			thighs,
			weight,
			images,
			main_photo
		} = user
		return (
			<Styles>
				<div className="mb-3">#{params.id}</div>
				<div className="row justify-content-end align-items-center mb-3">
					<div className="col-lg-2 col-4">
						Status: {is_active ? 'Active' : 'Inactive'}
					</div>
					<div className="col-lg-2 col-4">
						<Button
							label={moderated ? 'Unmoderate' : 'Moderate'}
							className="w-100 text-capitalize"
							onClick={() =>
								userModeration({
									user_id: _id,
									moderated: !moderated
								})
							}
							loading={loading}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-12">
						<div>Email: {email}</div>
						<div>Nickname: {nickname}</div>
						<div>Age: {age}</div>
						<div>Sex: {sex}</div>
					</div>
					<div className="col-lg-4 col-12">
						<div>Country: {country}</div>
						<div>Region: {region}</div>
						<div>Nationality: {nationality}</div>
					</div>
					<div className="col-lg-4 col-12">
						<div>Height: {height}</div>
						<div>Chest: {chest}</div>
						<div>Waist: {waist}</div>
						<div>Thighs: {thighs}</div>
						<div>Weight: {weight}</div>
					</div>
				</div>
				<div className="mt-5">
					{images.map((i, id) => (
						<UserPhoto
							key={id}
							index={id}
							image={i}
							main_photo={main_photo}
						/>
					))}
				</div>
			</Styles>
		)
	} else {
		return null
	}
}

const Styles = styled.div`
	padding: 30px 0;
	color: black;
	button {
		color: black;
	}
`
export default AdminUserInfo
