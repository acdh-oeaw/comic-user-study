import "@fontsource-variable/inter/slnt.css";
import "tailwindcss/tailwind.css";

import { type AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div>
			<header></header>
			<Component {...pageProps} />
			<footer></footer>
		</div>
	);
}
