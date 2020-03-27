import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
// import i18next from 'i18next'

import {
	t_rotateImage,
	t_changeMainPhotoAdmin,
	t_deleteUserImage
} from '../../redux/tracks'
import { a_updateUserImage, a_setModal } from '../../redux/actions'

import Button from '../../components/common/Button'
import LightBox from '../../components/common/LightBox'
const { REACT_APP_SERVER } = process.env

const UserPhoto = ({ image, main_photo, index }) => {
	const dispatch = useDispatch()
	const user = useSelector(store => store.users.user)

	const [action, setAction] = useState(null)
	const [viewImage, setViewImage] = useState(null)

	const rotate = async () => {
		if (!action) {
			const newRotation =
				image.rotation + 90 >= 360 ? 0 : image.rotation + 90
			setAction('rotating')
			await dispatch(t_rotateImage({ image, rotation: newRotation }))
			dispatch(
				a_updateUserImage({
					image: { ...image, rotation: newRotation },
					index
				})
			)
			setAction(null)
		}
	}
	const changeMainPhoto = async () => {
		if (!action) {
			setAction('changing')
			await dispatch(
				t_changeMainPhotoAdmin({
					payload: {
						user_id: user._id,
						main_photo: image._id
					},
					image
				})
			)
			setAction(null)
		}
	}
	const deleteImage = async () => {
		if (!action) {
			setAction('deleting')
			await dispatch(
				t_deleteUserImage({
					user_id: user._id,
					image_id: image._id
				})
			)
			setAction(null)
		}
	}
	const checked = main_photo ? image._id === main_photo._id : false
	return (
		<div className="row mb-5">
			{viewImage && (
				<LightBox
					index={index}
					images={[...user.images.map(i => REACT_APP_SERVER + i.url)]}
					close={() => setViewImage(null)}
				/>
			)}
			<div className="col-lg-3">
				{action === 'rotating' ? (
					<div
						className="d-flex align-items-center justify-content-center"
						style={{ width: '100%', height: 250 }}
					>
						<FontAwesomeIcon icon={faCircleNotch} size="2x" spin />
					</div>
				) : (
					<img
						onClick={() => setViewImage(image.url)}
						alt="img"
						src={`${REACT_APP_SERVER}${
							image.url
						}?${new Date().getTime()}`}
						className="img-fluid mx-auto d-block pointer"
					/>
				)}
			</div>
			<div className="col-lg-2 d-flex flex-column justify-content-around">
				<div className="custom-checkbox mt-2">
					<label>
						<input
							checked={checked}
							type="checkbox"
							onChange={() => changeMainPhoto()}
							disabled={checked}
						/>
						{action === 'changing' ? (
							<FontAwesomeIcon icon={faCircleNotch} spin />
						) : (
							<span className="checkbox-icon checkbox-icon--rect" />
						)}
						<span className="ml-2">main photo</span>
					</label>
				</div>
				<Button
					style={{ width: '120px' }}
					className="text-capitalize"
					loading={action === 'rotating'}
					onClick={() => rotate()}
				>
					<span className="fa fa-redo" />
					&nbsp;Rotate
				</Button>
				<div>
					{action === 'deleting' ? (
						<FontAwesomeIcon icon={faCircleNotch} spin />
					) : (
						<button
							style={{ padding: '5px 20px' }}
							href="#!"
							onClick={() =>
								dispatch(
									a_setModal({
										title: 'Confirm delete',
										message:
											'Are you sure you want to delete this image?',
										onClick: () => deleteImage()
									})
								)
							}
							disabled={checked}
						>
							Delete
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
export default UserPhoto
