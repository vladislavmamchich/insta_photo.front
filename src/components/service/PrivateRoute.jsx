import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
	const auth = useSelector(store => store.service.auth)
	return (
		<Route
			{...rest}
			render={props =>
				auth ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: process.env.REACT_APP_BASENAME,
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	)
}

export default PrivateRoute
