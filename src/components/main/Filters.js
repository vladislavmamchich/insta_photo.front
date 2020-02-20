import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	CountryDropdown,
	CountryRegionData
} from 'react-country-region-selector'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'
// import MainImage from '../components/main/MainImage'

// import { socket } from '../utils/socket'
import { a_setFilter, a_clearFilter } from '../../redux/actions'
// import { t_getCountries } from '../../redux/tracks'
import { ages } from '../../constants'

import Select from '../../components/common/Select'
import Loader from '../../components/service/Loader'

const shortCodesFromNames = {}
CountryRegionData.forEach(a => (shortCodesFromNames[a[0]] = a[1]))

const Filters = () => {
	const dispatch = useDispatch()

	const {
		filter: {
			showMe,
			showFavourites,
			sort,
			order,
			age,
			nationality,
			country,
			region,
			locality
		},
		countries
	} = useSelector(store => store.users)

	const getShortCodes = countries =>
		countries.map(c => {
			return shortCodesFromNames[c.value]
		})
	const { role } = useSelector(store => store.profile.data)
	// const useDidUpdateEffect = (fn, inputs) => {
	// 	const didMountRef = useRef(false)

	// 	useEffect(() => {
	// 		if (didMountRef.current) fn()
	// 		else didMountRef.current = true
	// 	}, inputs)
	// }
	const regionLabel =
		country === 'United States' ? 'all states' : 'all regions'
	const cities =
		country !== 'all' ? countries.find(c => c.value === country).cities : []
	return (
		<div className="prod-options d-flex flex-column flex-md-row">
			<div className="d-flex flex-column justify-content-start mr-5">
				<button
					disabled={role === 'observer'}
					className={`btn-link text-left ${showMe ? 'active' : ''}`}
					onClick={() =>
						dispatch(
							a_setFilter({
								field: 'showMe',
								value: !showMe
							})
						)
					}
				>
					show me
				</button>
				<button
					className={`btn-link text-left ${
						showFavourites ? 'active' : ''
					}`}
					onClick={() =>
						dispatch(
							a_setFilter({
								field: 'showFavourites',
								value: !showFavourites
							})
						)
					}
				>
					show favourites
				</button>
				<button
					className="btn-link text-left"
					onClick={() => dispatch(a_clearFilter())}
				>
					clear filters
				</button>
			</div>
			<div className="d-flex flex-row justify-content-start flex-wrap mr-5">
				<div className="d-flex flex-column mr-2">
					<div className="d-flex align-items-baseline">
						{countries ? (
							<CountryDropdown
								value={country}
								onChange={country => {
									dispatch(
										a_setFilter({
											field: 'country',
											value: country || 'all'
										})
									)
									dispatch(
										a_setFilter({
											field: 'region',
											value: 'all'
										})
									)
									dispatch(
										a_setFilter({
											field: 'locality',
											value: 'all'
										})
									)
								}}
								classes="country-region-select"
								defaultOptionLabel="all countries"
								whitelist={getShortCodes(countries)}
							/>
						) : (
							<div className="d-flex px-2">
								loading&nbsp;
								<Loader style={{ fontSize: 14 }} />
							</div>
						)}
					</div>
					<div className="d-flex align-items-baseline">
						{countries ? (
							<Select
								onChange={region =>
									dispatch(
										a_setFilter({
											field: 'region',
											value: region || 'all'
										})
									)
								}
								//width="90px"
								selected={region}
								options={
									country !== 'all'
										? [
												{
													label: regionLabel,
													value: 'all'
												},
												...cities
										  ]
										: [
												{
													label: regionLabel,
													value: 'all'
												}
										  ]
								}
								isDisabled={country === 'all'}
							/>
						) : (
							<div className="d-flex px-2">
								loading&nbsp;
								<Loader style={{ fontSize: 14 }} />
							</div>
						)}
					</div>
					<div className="d-flex align-items-baseline">
						{countries ? (
							<Select
								onChange={locality =>
									dispatch(
										a_setFilter({
											field: 'locality',
											value: locality || 'all'
										})
									)
								}
								selected={locality}
								options={
									country !== 'all'
										? [
												{
													label: 'all localities',
													value: 'all'
												},
												...countries.find(
													c => c.value === country
												).cities
										  ]
										: [
												{
													label: 'all localities',
													value: 'all'
												}
										  ]
								}
								isDisabled={country === 'all'}
							/>
						) : (
							<div className="d-flex px-2">
								loading&nbsp;
								<Loader style={{ fontSize: 14 }} />
							</div>
						)}
					</div>
				</div>
				<div>
					<div className="d-flex align-items-baseline">
						{countries ? (
							<CountryDropdown
								value={nationality}
								onChange={nationality =>
									dispatch(
										a_setFilter({
											field: 'nationality',
											value: nationality || 'all'
										})
									)
								}
								classes="country-region-select"
								defaultOptionLabel="all nationalities"
								whitelist={getShortCodes(countries)}
							/>
						) : (
							<div className="d-flex px-2">
								loading&nbsp;
								<Loader style={{ fontSize: 14 }} />
							</div>
						)}
					</div>
					<Select
						onChange={age =>
							dispatch(
								a_setFilter({
									field: 'age',
									value: age
								})
							)
						}
						width="90px"
						selected={age}
						options={ages}
					/>
				</div>
			</div>
			<div className="d-flex flex-row justify-content-start">
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr'
					}}
				>
					<div className="custom-checkbox mr-2">
						<label>
							<input
								checked={sort === 'date'}
								onChange={() =>
									dispatch(
										a_setFilter({
											field: 'sort',
											value: 'date'
										})
									)
								}
								type="checkbox"
							/>
							<span className="checkbox-icon" />
							<span className="ml-2">date</span>
						</label>
					</div>
					<div className="custom-checkbox mr-2">
						<label>
							<input
								checked={sort === 'likes'}
								onChange={() =>
									dispatch(
										a_setFilter({
											field: 'sort',
											value: 'likes'
										})
									)
								}
								type="checkbox"
							/>
							<span className="checkbox-icon" />
							<span className="ml-2">likes</span>
						</label>
					</div>
					<div className="custom-checkbox mr-2">
						<label>
							<input
								checked={sort === 'chest'}
								onChange={() =>
									dispatch(
										a_setFilter({
											field: 'sort',
											value: 'chest'
										})
									)
								}
								type="checkbox"
							/>
							<span className="checkbox-icon" />
							<span className="ml-2">chest</span>
						</label>
					</div>
					<div className="custom-checkbox mr-2">
						<label>
							<input
								checked={sort === 'height'}
								onChange={() =>
									dispatch(
										a_setFilter({
											field: 'sort',
											value: 'height'
										})
									)
								}
								type="checkbox"
							/>
							<span className="checkbox-icon" />
							<span className="ml-2">height</span>
						</label>
					</div>
					<div className="custom-checkbox mr-2">
						<label>
							<input
								checked={sort === 'waist'}
								onChange={() =>
									dispatch(
										a_setFilter({
											field: 'sort',
											value: 'waist'
										})
									)
								}
								type="checkbox"
							/>
							<span className="checkbox-icon" />
							<span className="ml-2">waist</span>
						</label>
					</div>
					<div className="custom-checkbox mr-2">
						<label>
							<input
								checked={sort === 'weight'}
								onChange={() =>
									dispatch(
										a_setFilter({
											field: 'sort',
											value: 'weight'
										})
									)
								}
								type="checkbox"
							/>
							<span className="checkbox-icon" />
							<span className="ml-2">weight</span>
						</label>
					</div>
					<div className="custom-checkbox mr-2">
						<label>
							<input
								checked={sort === 'thighs'}
								onChange={() =>
									dispatch(
										a_setFilter({
											field: 'sort',
											value: 'thighs'
										})
									)
								}
								type="checkbox"
							/>
							<span className="checkbox-icon" />
							<span className="ml-2">thighs</span>
						</label>
					</div>
				</div>
				<div className="d-flex flex-column align-content-stretch mb-2 ml-2">
					<a
						onClick={e => {
							e.preventDefault()
							dispatch(
								a_setFilter({
									field: 'order',
									value: 1
								})
							)
						}}
						href="#!"
						className={order === 1 ? 'active' : ''}
					>
						<span className="fa fa-chevron-up" />
					</a>
					<div className="flex-fill" />
					<a
						onClick={e => {
							e.preventDefault()
							dispatch(
								a_setFilter({
									field: 'order',
									value: -1
								})
							)
						}}
						href="#!"
						className={order === -1 ? 'active' : ''}
					>
						<span className="fa fa-chevron-down" />
					</a>
				</div>
			</div>
		</div>
	)
}
export default Filters
