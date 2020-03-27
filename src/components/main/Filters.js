import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import i18next from 'i18next'
import {
	CountryDropdown,
	CountryRegionData
} from 'react-country-region-selector'

import { a_setFilter, a_clearFilter } from '../../redux/actions'
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
			region
		},
		countries,
		nationalities
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

	useEffect(() => {
		// filterGeo()
		return () => {
			dispatch(a_clearFilter())
		}
	}, [])

	const regionLabel =
		country === 'United States'
			? i18next.t('all states')
			: i18next.t('all regions')
	const regions =
		country !== '' ? countries.find(c => c.value === country).regions : []
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
						{countries ? (
							<CountryDropdown
								value={country}
								onChange={country => {
									dispatch(
										a_setFilter({
											field: 'country',
											value: country || ''
										})
									)
									dispatch(
										a_setFilter({
											field: 'region',
											value: ''
										})
									)
								}}
								classes="country-region-select"
								defaultOptionLabel={i18next.t('all countries')}
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
								onChange={({ value }) =>
									dispatch(
										a_setFilter({
											field: 'region',
											value: value || ''
										})
									)
								}
								//width="90px"
								selected={region}
								options={
									country !== ''
										? [
												{
													label: regionLabel,
													value: ''
												},
												...regions
										  ]
										: [
												{
													label: regionLabel,
													value: ''
												}
										  ]
								}
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
						{countries ? (
							<CountryDropdown
								value={nationality}
								onChange={nationality =>
									dispatch(
										a_setFilter({
											field: 'nationality',
											value: nationality || ''
										})
									)
								}
								classes="country-region-select"
								defaultOptionLabel={i18next.t(
									'all nationalities'
								)}
								whitelist={getShortCodes(nationalities)}
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
								checked={sort === 'created_at'}
								onChange={() =>
									dispatch(
										a_setFilter({
											field: 'sort',
											value: 'created_at'
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
								checked={sort === 'total_likes'}
								onChange={() =>
									dispatch(
										a_setFilter({
											field: 'sort',
											value: 'total_likes'
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
