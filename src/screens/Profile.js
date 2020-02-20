import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

// import { t_loadProfile } from '../redux/tracks'
// import Select from '../components/common/Select'

import MyInfo from './profile/MyInfo'
import Favourites from './profile/Favourites'
import ChangePassword from './profile/ChangePassword'

class Profile extends PureComponent {
	state = {
		activeTab: 1
	}
	componentDidMount() {
		// this.props.loadProfile()
		const el = document.querySelector('.logo')
		el.scrollIntoView({ block: 'start', behavior: 'smooth' })
	}
	render() {
		const { activeTab } = this.state
		const { data } = this.props
		return (
			<Fragment>
				<ul
					className="nav nav-tabs profile-tabs"
					role="tablist"
					id="profile_tabs"
				>
					<li className="nav-item">
						<a
							className={`nav-link ${
								activeTab === 1 ? 'active' : ''
							}`}
							href="#!"
							onClick={() => this.setState({ activeTab: 1 })}
						>
							My info
						</a>
					</li>
					<li className="nav-item">
						<a
							className={`nav-link ${
								activeTab === 2 ? 'active' : ''
							}`}
							href="#!"
							onClick={() => this.setState({ activeTab: 2 })}
						>
							Favourites
						</a>
					</li>
					<li className="nav-item">
						<a
							className={`nav-link ${
								activeTab === 3 ? 'active' : ''
							}`}
							href="#!"
							onClick={() => this.setState({ activeTab: 3 })}
						>
							Change password
						</a>
					</li>
				</ul>
				<div
					className="tab-content profile-tab-content"
					id="profile_tabs_content"
				>
					{activeTab === 1 && data && <MyInfo />}
					{activeTab === 2 && <Favourites />}
					{activeTab === 3 && <ChangePassword />}
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	loading: state.service.loading,
	data: state.profile.data
})
const mapDispatchToProps = dispatch => ({
	// loadProfile: () => {
	// 	dispatch(t_loadProfile())
	// }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
