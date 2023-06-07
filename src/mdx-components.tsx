import { type MDXComponents } from "mdx/types";

import { SideNote } from "@/components/side-note";

const shared = {
	SideNote,
} as MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...shared,
		...components,
	};
}
