import { type ReactElement, type ReactNode } from "react";
import { useState } from "react";

import { QuizCardStatus, useQuiz } from "@/components/quiz/Quiz";
import { QuizCardLayout } from "@/components/quiz/QuizCardLayout";
import { trackQuizAnswer } from "@/lib/analytics";

export interface TextInputProps {
	children?: ReactNode;
	name: string;
}

/**
 * Multiple choice quiz.
 */
export function TextInput(props: TextInputProps): JSX.Element {
	const quiz = useQuiz();

	const [input, setInput] = useState("");

	function onValidate() {
		trackQuizAnswer("Validate quiz answer", props.name, input, input.length > 0);
		quiz.setStatus(input.length > 0 ? QuizCardStatus.CORRECT : QuizCardStatus.INCORRECT);
	}
	function onNext() {
		trackQuizAnswer("Navigate to next quiz answer", props.name, input, input.length > 0);
		quiz.next();
	}
	function onPrev() {
		trackQuizAnswer("Navigate to previous quiz answer", props.name, input, input.length > 0);
		quiz.previous();
	}

	const component = (
		<input
			type="text"
			className="border-2"
			value={input}
			onInput={(e) => setInput(e.target.value)}
		/>
	);

	return (
		<QuizCardLayout component={component} onValidate={onValidate} onNext={onNext} onPrev={onPrev}>
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
