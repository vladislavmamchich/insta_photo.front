import Geonames from 'geonames.js'
import { store } from '../redux/store'

export const languages = [
	{ label: 'english', value: 'en' },
	{ label: 'русский', value: 'ru' }
]
export const availableLanguages = ['en', 'ru']
export const sex = [
	{ label: 'female', value: 'female' },
	{ label: 'male', value: 'male' }
]
export let ages = [{ label: 'all ages', value: 'all' }]
;(() => {
	for (let i = 16; i <= 90; i++) {
		ages.push({ label: i, value: i })
	}
})()

export const forbiddenKeyCodes = [69, 187, 189, 190]

export const colors = {
	coral: '#fc7168',
	white: '#feffff',
	black: '#454545',
	grey: '#d8d8d8',
	blue: '#007fff',
	golden: '#f8b94d'
}

export const getGeonames = () => {
	return new Geonames({
		username: 'myusername',
		lan: store.getState().profile.language,
		encoding: 'JSON'
	})
}
