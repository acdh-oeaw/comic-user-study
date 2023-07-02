import { type MDXComponents } from "mdx/types";

import { MatomoComponent } from "@/components/matomo-component";
import { SideNote } from "@/components/side-note";
import { SvgElement } from "@/components/svg-element";

const shared = {
	SideNote,
	SvgElement,
	MatomoComponent,
} as MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...shared,
		...components,
	};
}
