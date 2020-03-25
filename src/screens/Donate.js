import React from 'react'
import { useSelector } from 'react-redux'
import i18next from 'i18next'

const Donate = () => {
	useSelector(store => store.profile.language)
	return (
		<div className="mt-5 registration">
			<div className="px-0 px-md-4">
				<h4 className="text-uppercase h2 text-center mb-4">
					{i18next.t('Donate')}
				</h4>
				<p>
					Some explanation text. Some explanation text. Some
					explanation text. Some explanation text.
				</p>
				<p>
					Some explanation text. Some explanation text. Some
					explanation text.
				</p>
			</div>
		</div>
	)
}

export default Donate
