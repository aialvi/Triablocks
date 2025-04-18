/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tb-',
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./src/**/*.php',
		'./triablocks.php',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0073aa',
					'50': '#e6f0ff',
					'100': '#baddff',
					'200': '#8ecaff',
					'300': '#61b7ff',
					'400': '#34a4ff',
					'500': '#0791ff',
					'600': '#007edb',
					'700': '#0073aa',
					'800': '#005885',
					'900': '#003d61',
				},
				secondary: {
					DEFAULT: '#23282d',
					'50': '#f2f3f3',
					'100': '#e6e7e8',
					'200': '#cdd0d2',
					'300': '#b4b9bc',
					'400': '#9ba1a6',
					'500': '#828a90',
					'600': '#6a7279',
					'700': '#515a63',
					'800': '#39424c',
					'900': '#23282d',
				},
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false, // Disable Tailwind's base styles to prevent conflicts with WordPress
	},
};