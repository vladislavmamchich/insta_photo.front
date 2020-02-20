import React, { useState } from 'react'

const { REACT_APP_SERVER } = process.env
const loop = true

const Carousel = ({ images, setSelectedImage, index }) => {
	index = index > 0 ? index : 0
	const [centerTile, setCenterTile] = useState(index)
	const imagesLength = images.length
	const setImage = i => {
		setCenterTile(i)
		setSelectedImage(i)
	}
	return (
		<div className="carousel">
			{images.map((img, i) => {
				let position = parseInt(i - centerTile)
				if (loop) {
					if (position > imagesLength / 2) {
						position = position - imagesLength
					} else if (position < 0 - imagesLength / 2) {
						position = position + imagesLength
					}
				}
				if (position < -1) {
					position = '-n'
				}
				if (position > 1) {
					position = 'n'
				}
				return (
					<div
						key={i}
						className="carousel-tile"
						data-position={position}
						onClick={() => setImage(i)}
					>
						<div className="image-container">
							<img src={REACT_APP_SERVER + img.url} alt="img" />
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Carousel
