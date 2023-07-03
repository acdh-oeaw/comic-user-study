import { type ReactElement, type ReactNode } from "react";
import { useState } from "react";

import { getChildElements } from "@/components/quiz/getChildElements";
import { QuizCardStatus, useQuiz } from "@/components/quiz/Quiz";
import { QuizCardLayout } from "@/components/quiz/QuizCardLayout";
import { trackQuizAnswer } from "@/lib/analytics";

export interface TextInputProps {
	children?: ReactNode;
	variant?: "multiple" | "single";
}

/**
 * Multiple choice quiz.
 */
export function TextInput(props: TextInputProps): JSX.Element {
	const quiz = useQuiz();

	const childElements = getChildElements(props.children);
	const options = childElements.filter(isTextInputOption);

	const correctAnswers = options
		.filter((option) => {
			return option.props.isCorrect === true;
		})
		.map((option) => {
			return options.indexOf(option);
		});
	/**
	 * Put `Set` in a 1-tuple, so we don't need to recreate the `Set` on every change.
	 */
	const [[checked]] = useState<[Set<number>]>([new Set()]);

	function onValidate() {
		const isCorrect =
			correctAnswers.length === checked.size &&
			correctAnswers.every((index) => {
				return checked.has(index);
			});
		trackQuizAnswer("", "", isCorrect);
		quiz.setStatus(isCorrect === true ? QuizCardStatus.CORRECT : QuizCardStatus.INCORRECT);
	}

	const component = <input type="text" className="border-2" />;

	return (
		<QuizCardLayout component={component} onValidate={onValidate}>
			{props.children}
		</QuizCardLayout>
	);
}

TextInput.isQuizCard = true;

export interface TextInputOptionProps {
	children?: ReactNode;
	isCorrect?: boolean;
}

/**
 * Multiple choice option.
 */
export function TextInputOption(props: TextInputOptionProps): JSX.Element {
	return <span>{props.children}</span>;
}

/**
 * Type guard for TextInputOption component.
 */
export function isTextInputOption(
	component: JSX.Element,
): component is ReactElement<TextInputOptionProps> {
	return component.type === TextInputOption;
}

TextInput.Option = TextInputOption;
