import createMdxPlugin from "@next/mdx";
import withGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const config = {
	pageExtensions: ["mdx", "tsx", "ts"],
	reactStrictMode: true,
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
