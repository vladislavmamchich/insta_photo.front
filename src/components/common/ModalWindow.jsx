import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import i18next from 'i18next'

import { a_setModal } from '../../redux/actions'

import Modal from '../service/Modal'

class ModalWindow extends PureComponent {
	clickButtonHandler = () => {
		const {
			modal: { onClick },
			setModal
		} = this.props
		setModal(null)
		if (onClick instanceof Function) {
			onClick()
		}
	}
	render() {
		const { setModal, modal } = this.props
		return (
			<Modal>
				<div className="modal-window">
					<div className="modal fade show">
						<div
							className="modal-dialog modal-dialog-centered custom-modal"
							role="document"
						>
							<div className="modal-content">
								{!modal.outClickForbidden && (
									<div className="modal-header">
										<button
											type="button"
											className="close"
											onClick={() => setModal(null)}
										>
											<span aria-hidden="true">×</span>
										</button>
									</div>
								)}
								<div className="modal-body align-items-center">
									<h1 className="text-center h2 text-uppercase mb-5">
										{modal.title}
									</h1>
									{/*									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipisicing elit. Cum doloribus eligendi
										enim inventore similique tempora, unde.
										Architecto laborum minima odio quidem
										voluptatibus. Adipisci corporis dolorum
										maxime nostrum, obcaecati perspiciatis
										provident.
									</p>*/}
									<p>{modal.message}</p>
								</div>
								<button
									type="button"
									className="btn btn-outline-light d-block mx-auto py-2 px-4 mb-5"
									onClick={() => this.clickButtonHandler()}
								>
									Yes, I understood
								</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow)
