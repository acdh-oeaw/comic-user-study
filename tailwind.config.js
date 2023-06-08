import typographyPlugin from "@tailwindcss/typography";
import colors from "tailwindcss/colors";

const neutral = colors.slate;
const primary = colors.cyan;

/** @type {import('tailwindcss').Config} */
const config = {
	content: ["./src/**/*.@(ts|tsx|mdx)"],
	plugins: [typographyPlugin],
	theme: {
		extend: {
			colors: {
				neutral,
				primary,
			},
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
