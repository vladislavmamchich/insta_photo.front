import React from 'react'
import NewWindow from 'react-new-window'

const Window = ({ children, url, onUnload }) => (
	<NewWindow
		url={url}
		onUnload={() => onUnload()}
		copyStyles={false}
		features={{ width: '100%' }}
	>
		{children}
	</NewWindow>
)
export default Window
