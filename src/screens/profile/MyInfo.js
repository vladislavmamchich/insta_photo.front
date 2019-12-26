import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { a_setModal } from '../../redux/actions'

import Select from '../../components/common/Select'
import ModalWindow from '../../components/common/ModalWindow'
import AddPhoto from '../../components/AddPhoto'

let photos = []

class MyInfo extends PureComponent {
	render() {
		const { setModal, modal } = this.props
		return (
			<div className="tab-pane fade show active">
				{modal && <ModalWindow />}
				<div className="px-0 px-md-4">
					<div className="row">
						<div className="col-xl-3 col-lg-4">
							<div className="custom-input">
								<input
									tabIndex={1}
									required
									type="text"
									name="nickname"
									placeholder="nickname"
								/>
								<button className="btn btn-link link-active-outline">
									update
								</button>
							</div>
							<div className="custom-input mt-3">
								<input
									tabIndex={2}
									required
									type="password"
									name="password"
									placeholder="password"
									autoComplete="new-password"
								/>
								<button className="btn btn-link link-active-outline">
									update
								</button>
							</div>
							<div
								className="custom-checkbox ml-4 mt-4"
								id="show_pass_check"
							>
								<label tabIndex={3}>
									<input type="checkbox" />
									<span className="checkbox-icon checkbox-icon--rect" />
									<span className="ml-2">show password</span>
								</label>
							</div>
							<div className="custom-input mt-3">
								<input
									tabIndex={4}
									required
									type="email"
									name="email"
									placeholder="email"
								/>
								<button className="btn btn-link link-active-outline">
									update
								</button>
							</div>
							<div className="custom-checkbox ml-4 mt-4">
								<label tabIndex={5}>
									<input type="checkbox" />
									<span className="checkbox-icon checkbox-icon--rect" />
									<span className="ml-2">
										allow share my email
									</span>
								</label>
							</div>
							<div className="custom-input mt-3">
								<input
									tabIndex={6}
									required
									type="text"
									name="secret"
									placeholder="secret word"
								/>
								<button className="btn btn-link link-active-outline">
									update
								</button>
							</div>
							<div className="mt-3 ml-3 d-flex ali">
								<span>sex:&nbsp;</span>
								<Select type="sex" width="90px" />
							</div>
						</div>
						<div className="col-xl-7 font-18 col-lg-5 mt-5 mt-lg-0">
							<p className="mb-0">
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Amet corporis debitis dolore
								dolores ea facere itaque iusto labore magnam
								maxime nam non obcaecati quod quos soluta sunt,
								totam, ullam? Dolorem.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Aliquam aperiam asperiores
								aspernatur aut autem beatae dolores, eligendi
								illo illum labore maxime officiis optio pariatur
								quaerat qui, quidem quisquam rem, soluta!
							</p>
							<br />
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Atque beatae commodi deleniti
								ducimus earum ex expedita ipsa laudantium minus
								modi mollitia nostrum numquam, optio provident
								quasi, saepe vitae voluptates voluptatum.
							</p>
						</div>
						<div className="col-xl-2 col-lg-3 pt-5">
							<p className="text-uppercase text-center mb-3">
								observer
							</p>
							<p className="text-center mb-0">
								registration date:
							</p>
							<p className="text-center">21/01/2019</p>
						</div>
					</div>
				</div>
				<hr />
				<div className="px-0 px-md-4 position-relative">
					<span className="far fa-check-square position-absolute" />
					<p className="text-center font-18">become a PARTICIPANT</p>
					<div className="row">
						<div className="col-lg-4 col-md-6 d-flex flex-column flex-md-row">
							<div className="mr-4">
								<Select
									type="country"
									className="left-asterisk"
								/>
								<Select
									type="region"
									className="left-asterisk"
								/>
								<Select
									type="locality"
									className="left-asterisk"
								/>
							</div>
							<div>
								<Select
									type="nationality"
									className="left-asterisk"
								/>
								<Select type="age" className="left-asterisk" />
							</div>
						</div>
						<div className="col-lg-5 col-md-6">
							<div className="row">
								<div className="col-12 col-md-4">
									<div className="custom-input with-asterisk my-2 mx-2">
										<input
											type="text"
											name="height"
											placeholder="height"
										/>
										<div className="ring" />
									</div>
									<div className="custom-input with-asterisk my-2 mx-2">
										<input
											type="text"
											name="chest"
											placeholder="chest"
										/>
										<div className="ring" />
									</div>
								</div>
								<div className="col-12 col-md-4">
									<div className="custom-input with-asterisk my-2 mx-2">
										<input
											type="text"
											name="weist"
											placeholder="weist"
										/>
										<div className="ring" />
									</div>
									<div className="custom-input with-asterisk my-2 mx-2">
										<input
											type="text"
											name="thighs"
											placeholder="thighs"
										/>
										<div className="ring" />
									</div>
								</div>
								<div className="col-12 col-md-4">
									<div className="custom-input with-asterisk my-2 mx-2">
										<input
											type="text"
											name="weight"
											placeholder="weight"
										/>
										<div className="ring" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3">
							<div className="a">
								<div className="custom-checkbox mt-3 mt-lg-0 mb-3">
									<label tabIndex={3}>
										<input name="plastics" type="radio" />
										<span className="checkbox-icon" />
										<span className="ml-2">
											I did some plastic operations
										</span>
									</label>
								</div>
								<div className="custom-checkbox my-3">
									<label tabIndex={3}>
										<input name="plastics" type="radio" />
										<span className="checkbox-icon" />
										<span className="ml-2">
											I never did plastic operations
										</span>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 mt-5 mb-3">
							<h1 className="text-uppercase h2 text-center text-uppercase">
								photos
							</h1>
							<p className="text-center">
								(add at least 1 photo, maximum 5)
							</p>
						</div>
						<div className="col-lg-2 mb-3">
							<label className="btn btn-outline-light">
								<span>choose...</span>
								<input type="file" className="d-none" />
							</label>
							<div className="custom-checkbox mt-2">
								<label tabIndex={3}>
									<input type="checkbox" />
									<span className="checkbox-icon checkbox-icon--rect" />
									<span className="ml-2">main photo</span>
								</label>
							</div>
						</div>
						<div className="col-lg-3 mb-3">
							<img
								src="http://lorempixel.com/500/600"
								className="img-fluid mx-auto d-block"
								alt="models"
							/>
						</div>
						<div className="col-lg-7 d-flex flex-column justify-content-end mb-3">
							<button className="btn btn-outline-light mr-auto d-flex align-items-center justify-content-center">
								<span className="fa fa-redo p-1" />
							</button>
						</div>
					</div>
					{photos.map((i, id) => (
						<AddPhoto key={id} />
					))}
					{photos.length < 4 && (
						<div className="row">
							<a
								onClick={() => photos.push(1)}
								className="mb-5"
								href="#!"
							>
								add more
							</a>
						</div>
					)}
				</div>
				<div className="d-none my-3 justify-content-between">
					<button className="btn btn-outline-light">Submit</button>
					<a href="#!">diactivate account</a>
				</div>
				<div className="px-0 px-md-4">
					<div className="row">
						<div className="col-12 mt-3 mb-3">
							<h1 className="text-uppercase h2 text-center text-uppercase">
								information
							</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-xl-5 col-lg-6 col-md-12 flex-wrap d-flex flex-column flex-md-row">
							<div className="mr-5">
								<p className="mb-1 no-wrap">
									Country: United States
								</p>
								<p className="mb-1 no-wrap">State: Kentucky</p>
								<p className="mb-1 no-wrap">
									Locality: Crestwood
								</p>
							</div>
							<div>
								<p className="mb-1 no-wrap">
									Nationality: United States
								</p>
								<p className="mb-1 no-wrap">Age: 23</p>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 flex-wrap d-flex flex-column flex-md-row">
							<div className="mr-5">
								<p className="mb-1 no-wrap">Height: 67 inch</p>
								<p className="mb-1 no-wrap">Chest: 67 inch</p>
								<p className="mb-1 no-wrap">Weist: 67 inch</p>
							</div>
							<div>
								<p className="mb-1 no-wrap">Thigs: 67 inch</p>
								<p className="mb-1 no-wrap">Weight: 67 inch</p>
								<p className="mb-1 no-wrap">Operations: 0</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 mt-3 mb-3">
							<h1 className="text-uppercase h2 text-center text-uppercase">
								Photos
							</h1>
						</div>
						<div className="col-12 user-images">
							<div className="image d-flex flex-column">
								<div className="likes">
									<span className="far fa-heart" />
									<span className="text">20000000</span>
								</div>
								<img
									className="img-fluid"
									src="http://lorempixel.com/300/600"
									alt="photo1"
								/>
								<p className="mb-0 mt-1">main photo</p>
							</div>
							<div className="image d-flex flex-column">
								<div className="likes">
									<span className="far fa-heart" />
									<span className="text">20000000</span>
								</div>
								<img
									className="img-fluid"
									src="http://lorempixel.com/600/800"
									alt="photo1"
								/>
							</div>
							<div className="image d-flex flex-column">
								<div className="likes">
									<span className="far fa-heart" />
									<span className="text">20000000</span>
								</div>
								<img
									className="img-fluid"
									src="http://lorempixel.com/300/300"
									alt="photo1"
								/>
							</div>
							<div className="image d-flex flex-column">
								<div className="likes">
									<span className="far fa-heart" />
									<span className="text">20000000</span>
								</div>
								<img
									className="img-fluid"
									src="http://lorempixel.com/300/300"
									alt="photo1"
								/>
							</div>
							<div className="image d-flex flex-column">
								<div className="likes">
									<span className="far fa-heart" />
									<span className="text">20000000</span>
								</div>
								<img
									className="img-fluid"
									src="http://lorempixel.com/300/300"
									alt="photo1"
								/>
							</div>
						</div>
						<a
							onClick={() => setModal({ title: 'test' })}
							href="#!"
							className="ml-auto mt-3"
						>
							deactivate the account
						</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyInfo)
