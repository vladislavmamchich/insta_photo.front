import React, { useState } from 'react'

const Input = React.forwardRef((props, ref) => {
	const {
		label,
		changeHandler,
		placeholder,
		type,
		disabled,
		onBlur,
		classNames,
		...rest
	} = props
	const [value, setValue] = useState('')
	const changeValue = e => {
		let { value, min, max, type } = e.target
		if (type === 'number') {
			value = Math.max(Number(min), Math.min(Number(max), Number(value)))
		}
		setValue(value)
		changeHandler(value)
	}
	const onKeyDown = e => {
		const { keyCode, target } = e
		if (
			keyCode === 32 ||
			keyCode === 188 ||
			(target.type !== 'email' && keyCode === 222)
		) {
			e.preventDefault()
		}
	}
	return (
		<div className={`custom-input ${classNames || ''}`}>
			<input
				type={type || 'text'}
				placeholder={placeholder || 'Enter value'}
				value={value}
				onChange={e => changeValue(e)}
				onBlur={() => (onBlur ? onBlur() : null)}
				disabled={disabled}
				onKeyDown={e => onKeyDown(e)}
				{...rest}
			/>
			{label && <label>{label}</label>}
		</div>
	)
})

export default Input
