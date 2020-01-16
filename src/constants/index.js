export const languages = [
	{ label: 'english', value: 'en' },
	{ label: 'русский', value: 'ru' }
]
export const sex = [
	{ label: 'female', value: 'female' },
	{ label: 'male', value: 'male' }
]
export const countries = [
	{ label: 'all countries', value: 'all' },
	{ label: 'Ukraine', value: 'Ukraine' },
	{ label: 'Russia', value: 'Russia' }
]
export const regions = [
	{ label: 'all regions', value: 'all' },
	{ label: 'Kyiv', value: 'Kyiv' },
	{ label: 'Chernihiv', value: 'Chernihiv' }
]
export const localities = [
	{ label: 'all localities', value: 'all' },
	{ label: 'Kyiv', value: 'Kyiv' },
	{ label: 'Chernihiv', value: 'Chernihiv' }
]
export const nationalities = [
	{ label: 'all nationalities', value: 'all' },
	{ label: 'Ukraine', value: 'Ukraine' },
	{ label: 'Russia', value: 'Russia' }
]
// export const ages = () => {
// 	let ages = [{ label: 'all ages', value: 'all' }]
// 	for (let i = 16; i < 90; i++) {
// 		ages.push({ label: i, value: i })
// 	}
// 	return ages
// }
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
