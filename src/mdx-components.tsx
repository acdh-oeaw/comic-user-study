import { type MDXComponents } from "mdx/types";

import { FinishButton } from "@/components/FinishButton";
import { Iframe } from "@/components/Iframe";
import { MatomoComponent } from "@/components/matomo-component";
import { Quiz } from "@/components/quiz/Quiz";
import { SideNote } from "@/components/side-note";
import { StartButton } from "@/components/StartButton";
import { SvgElement } from "@/components/svg-element";

const shared = {
	SideNote,
	SvgElement,
	MatomoComponent,
	Quiz,
	Iframe,
	StartButton,
	FinishButton,
} as MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...shared,
		...components,
	};
}
