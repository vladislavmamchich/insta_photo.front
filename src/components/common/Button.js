import React from 'react'
import LaddaButton, { SLIDE_LEFT } from 'react-ladda'

const Button = React.forwardRef((props, ref) => {
	const {
		className,
		label,
		title,
		loading,
		onClick,
		children,
		...rest
	} = props
	return (
		<LaddaButton
			className={className}
			loading={loading}
			onClick={onClick}
			data-style={SLIDE_LEFT}
			data-spinner-color="#fc7168"
			data-color="#000"
			title={title}
			{...rest}
			ref={ref}
		>
			{label || children}
		</LaddaButton>
	)
})

export default Button
