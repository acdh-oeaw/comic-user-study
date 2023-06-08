/** @typedef {import('next').NextConfig} NextConfig */

import { log } from "@acdh-oeaw/lib";
import createMdxPlugin from "@next/mdx";
import withGfm from "remark-gfm";

/** @type {NextConfig} */
const config = {
	eslint: {
		dirs: [process.cwd()],
		ignoreDuringBuilds: true,
	},
	async headers() {
		/** @type {Awaited<ReturnType<NonNullable<NextConfig['headers']>>>} */
		const headers = [];

		/**
		 * Only allow indexing by search engines when the `BOTS` environment variable is set.
		 */
		if (process.env.BOTS !== "enabled") {
			headers.push({
				source: "/:path*",
				headers: [
					{
						key: "X-Robots-Tag",
						value: "noindex, nofollow",
					},
				],
			});

			if (process.env.NODE_ENV === "production") {
				log.warn("Indexing by search engines is disallowed.");
			}
		}

		return headers;
	},
	output: "standalone",
	pageExtensions: ["mdx", "tsx", "ts"],
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: true,
	},
};

const plugins = [
	createMdxPlugin({
		options: {
			remarkPlugins: [withGfm],
		},
	}),
];

export default plugins.reduce((config, plugin) => {
	return plugin(config);
}, config);
