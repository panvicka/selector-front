/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		'badge-ghost',
		'badge-accent',
		'badge-secondary',
		'badge-secondary',
		'badge-primary',
		'alert-info',
		'alert-error',
		'alert-success',
		'alert-warning'
	],
	theme: {
		extend: {
			minWidth: (theme) => ({
				72: theme('spacing[72]')
			})
		}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')],
	darkMode: 'class'
};
