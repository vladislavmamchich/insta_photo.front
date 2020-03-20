import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { with } from 'react-redux'
import styled from 'styled-components'

// import { toast } from 'react-toastify'
// import i18next from 'i18next'

import { a_setIsAdmin } from '../../redux/actions'
import { t_loadUsers } from '../../redux/tracks'

import Table from './Table'

const colored_tds = ['is_active', 'moderated']

const Admin = ({ history }) => {
	const dispatch = useDispatch()
	const isAdmin = useSelector(store => store.service.isAdmin)
	const users = useSelector(store => store.users.users)
	useEffect(() => {
		dispatch(a_setIsAdmin(true))
		document.getElementById('root').style.backgroundColor = '#eee'
	}, [dispatch, isAdmin])

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '_id',
				sortType: 'basic',
				Cell: ({ cell: { value } }) => (
					<a
						href={`/admin/user/${value}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{value}
					</a>
				)
			},
			{
				Header: 'Email/Nickname',
				columns: [
					{
						Header: 'Email',
						accessor: 'email'
					},
					{
						Header: 'Nickname',
						accessor: 'nickname'
					}
				]
			},
			{
				Header: 'Info',
				columns: [
					{
						Header: 'Role',
						accessor: 'role',
						sortType: 'basic'
					},
					{
						Header: 'Sex',
						accessor: 'sex',
						sortType: 'basic'
					},
					{
						Header: 'Age',
						accessor: 'age',
						sortType: 'basic'
					}
				]
			},
			{
				Header: 'Status',
				columns: [
					{
						Header: 'Moderated',
						accessor: 'moderated',
						sortType: 'basic',
						Cell: ({ cell: { value } }) => (
							<div style={{ backgroundColor: '#000' }}>
								{value}
							</div>
						)
					},
					{
						Header: 'Is active',
						accessor: 'is_active',
						sortType: 'basic'
					}
				]
			}
		],
		[]
	)

	// const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	// const [pageCount, setPageCount] = useState(0)
	const fetchIdRef = useRef(0)

	const fetchData = useCallback(
		async ({ pageSize, pageIndex }) => {
			try {
				// Give this fetch an ID
				const fetchId = ++fetchIdRef.current
				setLoading(true)
				await dispatch(
					t_loadUsers({ page: pageIndex + 1, limit: pageSize })
				)
				// await loadUsers({ page: pageIndex + 1, limit: pageSize })
				// Only update the data if this is the latest fetch
				if (fetchId === fetchIdRef.current) {
					// const startRow = pageSize * pageIndex
					// const endRow = startRow + pageSize
					// setData(users ? users.docs : [])
					// setData(serverData.slice(startRow, endRow))

					// Your server could send back total page count.
					// For now we'll just fake it, too
					// setPageCount(Math.ceil(serverData.length / pageSize))

					setLoading(false)
				}
			} catch (err) {
				if (err === 'Forbidden') {
					history.push('/')
				}
			}
		},
		[dispatch]
	)

	return (
		<Styles>
			<h3>Users</h3>
			<Table
				columns={columns}
				data={users ? users.docs : []}
				getCellProps={({ column, value }) => {
					if (colored_tds.includes(column.id)) {
						return {
							style: {
								backgroundColor: value ? '#0f0' : '#f00'
							}
						}
					}
					return {}
				}}
				fetchData={fetchData}
				loading={loading}
				pageCount={users ? users.totalPages : 0}
			/>
		</Styles>
	)
}

const Styles = styled.div`
	padding: 30px 0;
	color: black;
	table {
		border-spacing: 0;
		border: 1px solid black;
		width: 100%;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}

		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid black;
			border-right: 1px solid black;
			font-size: 12px;

			:last-child,
			:nth-last-child(2) {
				width: 80px;
			}
		}
		tbody tr:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
	.pagination {
		padding: 0.5rem;
		justify-content: center;
	}
	a {
		color: black;
		display: block;
		:hover {
			color: blue;
		}
	}
`
export default Admin
