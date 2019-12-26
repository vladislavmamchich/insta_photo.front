import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
// import i18next from 'i18next'

class Navs extends PureComponent {
	render() {
		return (
			<div className="d-flex justify-content-center justify-content-sm-end my-3 mx-2">
				<nav>
					<ul className="list-clear d-flex m-0 p-0">
						<li>
							<NavLink
								to="/main"
								className="font-18 fam-fre ml-4"
								activeClassName="link-active-outline"
							>
								main
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile"
								className="font-18 fam-fre ml-4"
								activeClassName="link-active-outline"
							>
								my profile
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/donate"
								className="font-18 fam-fre ml-4"
								activeClassName="link-active-outline"
							>
								donate
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	language: state.profile.language
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Navs)
