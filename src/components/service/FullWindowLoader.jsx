import React from 'react'

const FullWindowLoader = ({ className, style, containerStyle }) => {
	return (
		<div className="full-window-loader">
			<i className="loader fas fa-spinner fa-pulse fa-2x" />
		</div>
	)
}

export default FullWindowLoader
