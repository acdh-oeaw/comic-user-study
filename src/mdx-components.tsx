import { type MDXComponents } from "mdx/types";

import { Iframe } from "@/components/Iframe";
import { MatomoComponent } from "@/components/matomo-component";
import { Quiz } from "@/components/quiz/Quiz";
import { SideNote } from "@/components/side-note";
import { SvgElement } from "@/components/svg-element";

const shared = {
	SideNote,
	SvgElement,
	MatomoComponent,
	Quiz,
	Iframe,
} as MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...shared,
		...components,
	};
}
