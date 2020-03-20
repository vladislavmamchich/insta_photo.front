import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'
import { t_loadUserInfo, t_userModeration } from '../../redux/tracks'

import Button from '../../components/common/Button'
import UserPhoto from './UserPhoto'

const AdminUserInfo = props => {
	const {
		match: { params },
		history
	} = props

	const dispatch = useDispatch()
	const user = useSelector(store => store.users.user)

	const [loading, setLoading] = useState(false)

	const loadUserInfo = async () => {
		await dispatch(t_loadUserInfo({ user_id: params.id }))
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
			country,
			locality,
			nationality,
			height,
			chest,
			waist,
			thighs,
			weight,
			region,
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
						<div>Locality: {locality}</div>
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

// const mapStateToProps = state => ({
// 	language: state.profile.language
// })
// const mapDispatchToProps = dispatch => ({
// 	setIsAdmin: payload => dispatch(a_setIsAdmin(payload)),
// 	loadUserInfo: payload => dispatch(t_loadUserInfo(payload))
// })
// export default connect(mapStateToProps, mapDispatchToProps)(AdminUserInfo)
export default AdminUserInfo
