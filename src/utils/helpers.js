import { availableLanguages } from '../constants'

export const isValidEmail = email => {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}
export const reEscape = s => {
	return s.replace(/[^\w\s]/gi, '')
}
export function isNumeric(number) {
	return !isNaN(parseFloat(number)) && isFinite(number)
}
export function getRandomColor() {
	return '#' + (((1 << 24) * Math.random()) | 0).toString(16)
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
	// return (
	// 	(navigator.languages && navigator.languages[0]) ||
	// 	navigator.language ||
	// 	navigator.userLanguage
	// )
	const locale =
		[
			...(navigator.languages || []),
			navigator.language,
			navigator.browserLanguage,
			navigator.userLanguage,
			navigator.systemLanguage
		]
			.filter(Boolean)
			.map(language => language.substr(0, 2))
			.find(language => availableLanguages.includes(language)) || 'en'
	return locale
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
export const weightConverter = (value, fromUnit, toUnit) => {
	if (fromUnit === 'kg' && toUnit === 'lb') {
		return +(value * 2.2046).toFixed(2)
	}
	if (fromUnit === 'lb' && toUnit === 'kg') {
		return +(value / 2.2046).toFixed(2)
	}
	return value
}
export const heightConverter = (value, fromUnit, toUnit) => {
	if (fromUnit === 'cm' && toUnit === 'inch') {
		return +(value / 2.54).toFixed(2)
	}
	if (fromUnit === 'inch' && toUnit === 'cm') {
		return +(value * 2.54).toFixed(2)
	}
	return value
}
