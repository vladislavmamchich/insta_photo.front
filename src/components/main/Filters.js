import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import i18next from 'i18next'
// import {
// 	CountryDropdown,
// 	CountryRegionData
// } from 'react-country-region-selector'
// import { NavLink } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import MainImage from '../components/main/MainImage'

// import { socket } from '../utils/socket'
import { a_setFilter, a_clearFilter } from '../../redux/actions'
// import { t_getCountries } from '../../redux/tracks'
import { getGeonames, ages } from '../../constants'

import Select from '../../components/common/Select'
// import Select from '../../components/common/Select'
import Loader from '../../components/service/Loader'

const geonames = getGeonames()

const Filters = () => {
	const dispatch = useDispatch()
	// const [selectedCountry, selectCountry] = useState({
	// 	label: i18next.t('all countries'),
	// 	value: ''
	// })
	// const [selectedRegion, selectRegion] = useState({
	// 	label: i18next.t('all regions'),
	// 	value: ''
	// })
	const [countries, setCountries] = useState([])
	const [nationalities, setNationalities] = useState([])
	const [regions, setRegions] = useState([])

	const {
		filter: {
			showMe,
			showFavourites,
			sort,
			order,
			age,
			nationality,
			country,
			region
		},
		countriesObj,
		countriesGeonamesIds,
		nationalitiesGeonamesIds
	} = useSelector(store => store.users)

	const { role } = useSelector(store => store.profile.data)
	// const useDidUpdateEffect = (fn, inputs) => {
	// 	const didMountRef = useRef(false)

	// 	useEffect(() => {
	// 		if (didMountRef.current) fn()
	// 		else didMountRef.current = true
	// 	}, inputs)
	// }
	const filterGeo = async () => {
		const all = await geonames.countryInfo({})
		let localCountries = [],
			localNationalities = []
		for (const c of all.geonames) {
			if (nationalitiesGeonamesIds.includes(c.geonameId)) {
				localNationalities.push({
					label: c.countryName,
					value: c.geonameId
				})
			}
			if (countriesGeonamesIds.includes(c.geonameId)) {
				localCountries.push({
					label: c.countryName,
					value: c.geonameId
				})
			}
		}
		setNationalities(localNationalities)
		setCountries(localCountries)
	}

	useEffect(() => {
		filterGeo()
		return () => {
			dispatch(a_clearFilter())
		}
	}, [])

	const selectCountryHandler = async country => {
		// selectCountry(country)
		// selectRegion({
		// 	label: i18next.t('all regions'),
		// 	value: ''
		// })
		dispatch(
			a_setFilter({
				field: 'country',
				value: country.value || ''
			})
		)
		dispatch(
			a_setFilter({
				field: 'region',
				value: ''
			})
		)
		if (country.value) {
			let states = await geonames.children({
				geonameId: country.value
			})
			states = states.geonames.filter(s =>
				countriesObj[country.value].includes(s.geonameId)
			)
			const regions = states.map(s => {
				return {
					label: s.name,
					value: s.geonameId
				}
			})
			setRegions(regions)
		}
	}

	const regionLabel =
		country === 6252001 ? i18next.t('all states') : i18next.t('all regions')
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
					{i18next.t('show me')}
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
					{i18next.t('show favourites')}
				</button>
				<button
					className="btn-link text-left"
					onClick={() => dispatch(a_clearFilter())}
				>
					{i18next.t('clear filters')}
				</button>
			</div>
			<div className="d-flex flex-row justify-content-start flex-wrap mr-5">
				<div className="d-flex flex-column mr-2">
					<div className="d-flex align-items-baseline">
						{countriesGeonamesIds ? (
							<Select
								onChange={country =>
									selectCountryHandler(country)
								}
								selected={country}
								options={[
									{
										label: i18next.t('all countries'),
										value: ''
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
							<Select
								onChange={region => {
									// selectRegion(region)
									dispatch(
										a_setFilter({
											field: 'region',
											value: region.value || ''
										})
									)
								}}
								selected={region}
								options={[
									{
										label: regionLabel,
										value: ''
									},
									...regions
								]}
								isDisabled={country === ''}
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
						{nationalitiesGeonamesIds ? (
							<Select
								onChange={({ value }) => {
									dispatch(
										a_setFilter({
											field: 'nationality',
											value
										})
									)
								}}
								selected={nationality}
								options={[
									{
										label: i18next.t('all nationalities'),
										value: ''
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
						onChange={({ value }) =>
							dispatch(
								a_setFilter({
									field: 'age',
									value
								})
							)
						}
						selected={age}
						options={[
							{ label: i18next.t('all ages'), value: '' },
							...ages
						]}
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
							<span className="ml-2">{i18next.t('date')}</span>
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
							<span className="ml-2">{i18next.t('likes')}</span>
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
							<span className="ml-2">{i18next.t('chest')}</span>
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
							<span className="ml-2">{i18next.t('height')}</span>
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
							<span className="ml-2">{i18next.t('waist')}</span>
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
							<span className="ml-2">{i18next.t('weight')}</span>
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
							<span className="ml-2">{i18next.t('thighs')}</span>
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
