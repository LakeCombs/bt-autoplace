/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				heroimage: "url('/public/pictbacjkg.png')",
			},
		},

		fontSize: {
			sm: ["12px", "15px"],
			base: ["16px", "24px"],
			lg: ["20px", "28px"],
			xl: ["24px", "32px"],
		},
		screens: {
			sm: "425px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
	},
	plugins: [],
};
