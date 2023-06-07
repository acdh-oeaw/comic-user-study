import typographyPlugin from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
	content: ["./src/**/*.@(ts|tsx|mdx)"],
	plugins: [typographyPlugin],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter Variable", "system-ui", "sans-serif"],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: null,
					},
				},
			},
		},
	},
};

export default config;
