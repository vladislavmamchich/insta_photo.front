import React from 'react'
import { NavLink } from 'react-router-dom'
import i18next from 'i18next'
import { useSelector } from 'react-redux'

const Navs = () => {
	useSelector(store => store.profile.language)
	return (
		<div className="d-flex justify-content-center justify-content-sm-end my-3 mx-2">
			<nav>
				<ul className="list-clear d-flex m-0 p-0">
					<li>
						<NavLink
							to="/"
							exact
							className="font-18 fam-fre ml-4"
							activeClassName="link-active-outline"
						>
							{i18next.t('main')}
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/profile"
							className="font-18 fam-fre ml-4"
							activeClassName="link-active-outline"
						>
							{i18next.t('my profile')}
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/donate"
							className="font-18 fam-fre ml-4"
							activeClassName="link-active-outline"
						>
							{i18next.t('donate')}
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Navs
