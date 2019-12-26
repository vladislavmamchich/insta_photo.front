const fs = require('fs')
const chalk = require('chalk')

module.exports = {
	input: [
		'src/**/*.jsx',
		'src/**/*.js',
		// Use ! to filter out files or directories
		'!src/**/*.spec.{js,jsx}',
		'!**/node_modules/**'
	],
	output: './',
	options: {
		debug: true,
		func: {
			list: ['i18next.t', 'i18n.t'],
			extensions: ['.js', '.jsx']
		},
		trans: null,
		lngs: ['en', 'ru'],
		ns: ['translation'],
		defaultLng: 'en',
		defaultNs: 'translation',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			loadPath: 'src/languages/{{lng}}.json',
			savePath: 'src/languages/{{lng}}.json',
			jsonIndent: 2,
			lineEnding: '\n'
		},
		nsSeparator: false, // namespace separator
		keySeparator: false, // key separator
		interpolation: {
			prefix: '{{',
			suffix: '}}'
		}
	},
	transform: function customTransform(file, enc, done) {
		'use strict'
		const parser = this.parser
		const content = fs.readFileSync(file.path, enc)
		let count = 0

		parser.parseFuncFromString(
			content,
			{ list: ['i18next._', 'i18next.__'] },
			(key, options) => {
				parser.set(
					key,
					Object.assign({}, options, {
						nsSeparator: false,
						keySeparator: false
					})
				)
				++count
			}
		)

		if (count > 0) {
			console.log(
				`i18next-scanner: count=${chalk.cyan(
					count
				)}, file=${chalk.yellow(JSON.stringify(file.relative))}`
			)
		}

		done()
	}
}
