import { type MDXComponents } from "mdx/types";

import { MatomoComponent } from "@/components/matomo-component";
import { SideNote } from "@/components/side-note";

const shared = {
	SideNote,
	MatomoComponent,
} as MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...shared,
		...components,
	};
}
