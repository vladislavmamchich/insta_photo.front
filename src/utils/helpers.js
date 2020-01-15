import { toast } from 'react-toastify'
import moment from 'moment'
import i18next from 'i18next'

export const isValidEmail = email => {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return email === '' || re.test(String(email).toLowerCase())
}
export const getHMFromDate = str => {
	let date = new Date(str)
	const h = date.getHours()
	const m = date.getMinutes()
	return `${('0' + h).slice(-2)}:${('0' + m).slice(-2)}`
}
export const getFormattedDateTime = date => {
	const a = moment()
	const b = moment(date)
	const diff = (a.diff(b) / 86400000) | 0
	if (diff === 0) {
		return getHMFromDate(date)
	}
	if (diff > 0 && diff < 7) {
		return b.format('dddd HH:mm')
	}
	if (a.year() !== b.year()) {
		return b.format('DD MMM HH:mm, YYYY')
	}
	return b.format('DD MMM HH:mm')
}
export const getFormattedDate = date => {
	const a = moment()
	const b = moment(date)
	const diff = (a.diff(b) / 86400000) | 0
	if (diff === 0) {
		return 'Сегодня'
	}
	if (diff === 1) {
		return 'Вчера'
	}
	if (diff > 1 && diff < 7) {
		return b.format('dddd')
	}
	if (a.year() !== b.year()) {
		return b.format('DD MMM, YYYY')
	}
	return b.format('DD MMMM')
}
export const reEscape = s => {
	return s.replace(/[^\w\s]/gi, '')
}

export const bytesToSize = bytes => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	if (bytes === 0) return 'n/a'
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
	if (i === 0) return `${bytes} ${sizes[i]}`
	return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}

export const getUserName = (
	{ first_name, last_name, middle_name, phone_number },
	full = false
) => {
	const full_name = full
		? `${last_name} ${first_name} ${middle_name}`
		: `${first_name} ${last_name}`
	const res = full_name.length > 4 ? full_name : phone_number
	return res
}

export function isNumeric(number) {
	return !isNaN(parseFloat(number)) && isFinite(number)
}

export function getRandomColor() {
	return '#' + (((1 << 24) * Math.random()) | 0).toString(16)
}

export const getGeo = cb => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(cb, showGeoError, {
			enableHighAccuracy: true
		})
	} else {
		toast.warn(i18next.t('Geolocation is not supported by your browser'))
		// toast.warn('Геолокация не поддерживается вашим браузером')
	}
}

function showGeoError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			toast.warn(i18next.t('User denied the request for Geolocation'))
			break
		case error.POSITION_UNAVAILABLE:
			toast.warn(i18next.t('Location information is unavailable'))
			break
		case error.TIMEOUT:
			toast.warn(i18next.t('The request to get user location timed out'))
			break
		case error.UNKNOWN_ERROR:
			toast.warn(i18next.t('An unknown error occurred'))
			break
		default:
			toast.warn(i18next.t('An unknown error occurred'))
	}
}

export const allowAccessGeo = ({ position, role }) => {
	if (
		(position && position.request_geo >= 0) ||
		(role && role.request_geo >= 0)
	) {
		return true
	}
	return false
}

export const validURL = str => {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	) // fragment locator
	return !!pattern.test(str)
}

export const declOfNum = (n, titles) => {
	return titles[
		n % 10 === 1 && n % 100 !== 11
			? 0
			: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
			? 1
			: 2
	]
}

export const checkRightAccess = (user, rights) => {
	const { role, position } = user
	if (!role && !position) {
		return false
	}
	if (role && role[rights]) {
		return true
	}
	if (position && position[rights]) {
		return true
	}
	return false
}

export const isOnline = () => {
	return new Promise(resolve => {
		if (navigator.onLine) {
			const webPing = setInterval(() => {
				fetch('//google.com', {
					mode: 'no-cors'
				})
					.then(() => {
						clearInterval(webPing)
						resolve(true)
					})
					.catch(() => resolve(false))
			}, 2000)
		} else {
			resolve(false)
		}
	})
}
export const getNavigatorLanguage = () => {
	return (
		(navigator.languages && navigator.languages[0]) ||
		navigator.language ||
		navigator.userLanguage
	)
}
export const debounce = (f, ms) => {
	let isCooldown = false
	return function() {
		if (isCooldown) return
		f.apply(this, arguments)
		isCooldown = true
		setTimeout(() => (isCooldown = false), ms)
	}
}
