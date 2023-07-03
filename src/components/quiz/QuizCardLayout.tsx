import { type ReactNode } from "react";

import { getChildElements } from "@/components/quiz/getChildElements";
import { QuizControls } from "@/components/quiz/QuizControls";
import { isQuizMessage } from "@/components/quiz/QuizMessage";
import { QuizMessages } from "@/components/quiz/QuizMessages";
import { isQuizQuestion } from "@/components/quiz/QuizQuestion";

export interface QuizCardLayoutProps {
	children?: ReactNode;
	component?: JSX.Element;
	onValidate: () => void;
}

/**
 * Quiz card layout.
 */
export function QuizCardLayout(props: QuizCardLayoutProps): JSX.Element {
	const childElements = getChildElements(props.children);
	const question = childElements.filter(isQuizQuestion);
	const messages = childElements.filter(isQuizMessage);

	return (
		<div className="quiz-card flex flex-col space-y-8 rounded bg-white p-8 shadow-md">
			{question}
			{props.component}
			<QuizControls onValidate={props.onValidate} />
			<QuizMessages messages={messages} />
		</div>
	);
}
