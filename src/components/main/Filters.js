import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import {
// 	CountryDropdown,
// 	CountryRegionData
// } from 'react-country-region-selector'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'
// import MainImage from '../components/main/MainImage'

// import { socket } from '../utils/socket'
import { a_setFilter, a_clearFilter } from '../../redux/actions'
// import { t_getCountries } from '../../redux/tracks'
import { ages } from '../../constants'

import Select from '../../components/common/Select'
import GeoSelect from '../../components/common/GeoSelect'
import Loader from '../../components/service/Loader'

// const shortCodesFromNames = {}
// CountryRegionData.forEach(a => (shortCodesFromNames[a[0]] = a[1]))

const Filters = () => {
	const dispatch = useDispatch()
	const [selectedCountry, selectCountry] = useState({
		label: 'all countries',
		value: 'all'
	})
	const [selectedRegion, selectRegion] = useState({
		label: 'all regions',
		value: 'all'
	})

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
		countries,
		nationalities
	} = useSelector(store => store.users)

	// const getShortCodes = countries =>
	// 	countries.map(c => {
	// 		return shortCodesFromNames[c.value]
	// 	})
	const { role } = useSelector(store => store.profile.data)
	// const useDidUpdateEffect = (fn, inputs) => {
	// 	const didMountRef = useRef(false)

	// 	useEffect(() => {
	// 		if (didMountRef.current) fn()
	// 		else didMountRef.current = true
	// 	}, inputs)
	// }
	useEffect(() => {
		return () => {
			dispatch(a_clearFilter())
		}
	}, [])
	const regionLabel =
		country === 'United States' ? 'all states' : 'all regions'
	const regions =
		selectedCountry.value !== 'all' ? selectedCountry.regions : []
	const cities = selectedRegion.value !== 'all' ? selectedRegion.cities : []
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
							<GeoSelect
								onChange={country => {
									selectCountry(country)
									selectRegion({
										label: 'all regions',
										value: 'all'
									})
									dispatch(
										a_setFilter({
											field: 'country',
											value: country.value || 'all'
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
								selected={country}
								options={[
									{
										label: 'all countries',
										value: 'all'
									},
									...countries
								]}
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
							<GeoSelect
								onChange={region => {
									selectRegion(region)
									dispatch(
										a_setFilter({
											field: 'region',
											value: region.value || 'all'
										})
									)
								}}
								selected={region}
								options={[
									{
										label: regionLabel,
										value: 'all'
									},
									...regions
								]}
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
							<GeoSelect
								onChange={locality =>
									dispatch(
										a_setFilter({
											field: 'locality',
											value: locality.value || 'all'
										})
									)
								}
								selected={locality}
								options={[
									{
										label: 'all localities',
										value: 'all'
									},
									...cities
								]}
								isDisabled={region === 'all'}
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
						{nationalities ? (
							<GeoSelect
								onChange={nationality => {
									dispatch(
										a_setFilter({
											field: 'nationality',
											value: nationality.value || 'all'
										})
									)
								}}
								selected={nationality}
								options={[
									{
										label: 'all nationalities',
										value: 'all'
									},
									...nationalities
								]}
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
