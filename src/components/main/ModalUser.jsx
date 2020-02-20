import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { a_setModal } from '../../redux/actions'

import User from '../../screens/User'

class ModalUser extends PureComponent {
	render() {
		const { setModal, user_id } = this.props
		return (
			<div className="modal fade show">
				<div
					className="modal-dialog modal-dialog-centered"
					style={{ minWidth: '95%' }}
				>
					<div
						className="modal-content"
						style={{ backgroundColor: '#fc7168' }}
					>
						<div className="modal-header">
							<button
								type="button"
								className="close"
								onClick={() => setModal(null)}
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body align-items-center">
							<User user_id={user_id} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	modal: state.service.modal,
	language: state.profile.language
})
const mapDispatchToProps = dispatch => ({
	setModal: payload => {
		dispatch(a_setModal(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser)
