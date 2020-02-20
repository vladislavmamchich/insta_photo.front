import React from 'react'

const Loader = ({ className, style, containerStyle }) => {
	return (
		<div style={containerStyle} className={`loader ${className || ''}`}>
			<i className="loader fas fa-spinner fa-pulse" style={style} />
		</div>
	)
}

export default Loader
