import React from 'react'
import { useSelector } from 'react-redux'
import i18next from 'i18next'

const Footer = () => {
	useSelector(store => store.profile.language)
	return (
		<footer className="d-flex my-3">
			<span className="fam-fre position-absolute">(c) somename</span>
			<div className="mx-auto fam-fre">
				<a href="/terms" target="_blank">
					{i18next.t('Terms of Use')}
				</a>
				<span>&nbsp;|&nbsp;</span>
				<a href="/privacy" target="_blank">
					{i18next.t('Privacy Policy')}
				</a>
			</div>
		</footer>
	)
}

export default Footer
