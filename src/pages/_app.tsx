import "@fontsource-variable/inter/slnt.css";
import "@fontsource/amatic-sc";
import "tailwindcss/tailwind.css";
import "@/styles/index.css";

import { type AppProps } from "next/app";
import { Fragment } from "react";

import { Layout } from "@/components/Layout";
import { AnalyticsScript } from "@/lib/analytics";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<AnalyticsScript
				baseUrl={process.env.NEXT_PUBLIC_MATOMO_BASE_URL}
				id={process.env.NEXT_PUBLIC_MATOMO_ID}
			/>

			<div className="relative grid min-h-full grid-rows-[auto_1fr_auto]">
				<AppHeader />
				<Layout>
					<Component {...pageProps} />
				</Layout>
				<AppFooter />
			</div>
		</Fragment>
	);
}

function AppHeader() {
	return <header></header>;
}

function AppFooter() {
	return <footer></footer>;
}
