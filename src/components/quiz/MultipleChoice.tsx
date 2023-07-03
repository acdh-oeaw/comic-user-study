import { type ReactElement, type ReactNode } from "react";
import { useState } from "react";

import { getChildElements } from "@/components/quiz/getChildElements";
import { QuizCardStatus, useQuiz } from "@/components/quiz/Quiz";
import { QuizCardLayout } from "@/components/quiz/QuizCardLayout";
import { trackQuizAnswer } from "@/lib/analytics";

export interface MultipleChoiceProps {
	children?: ReactNode;
	variant?: "multiple" | "single";
	name: string;
}

/**
 * Multiple choice quiz.
 */
export function MultipleChoice(props: MultipleChoiceProps): JSX.Element {
	const quiz = useQuiz();

	const childElements = getChildElements(props.children);
	const options = childElements.filter(isMultipleChoiceOption);
	const correctAnswers = options
		.filter((option) => {
			return option.props.isCorrect === true;
		})
		.map((option) => {
			return options.indexOf(option);
		});
	const isSingleChoice = props.variant === "single";
	/**
	 * Put `Set` in a 1-tuple, so we don't need to recreate the `Set` on every change.
	 */
	const [[checked], setChecked] = useState<[Set<number>]>([new Set()]);

	function toggle(index: number) {
		if (isSingleChoice) {
			setChecked([new Set([index])]);
		} else {
			setChecked(([checked]) => {
				if (checked.has(index)) {
					checked.delete(index);
				} else {
					checked.add(index);
				}
				return [checked];
			});
		}
		quiz.setStatus(QuizCardStatus.UNANSWERED);
	}

	function optionToString(option: any) {
		console.log(option.props?.children);
		console.log(option.props?.children?.props?.children);
		return option.props?.children?.props?.children;
	}

	function onNext() {
		const isCorrect =
			correctAnswers.length === checked.size &&
			correctAnswers.every((index) => {
				return checked.has(index);
			});
		trackQuizAnswer(
			"Navigate to next quiz answer",
			props.name,
			[...checked].map((i) => optionToString(options[i])).join(", "),
			isCorrect,
		);
		quiz.next();
	}
	function onPrev() {
		const isCorrect =
			correctAnswers.length === checked.size &&
			correctAnswers.every((index) => {
				return checked.has(index);
			});
		trackQuizAnswer(
			"Navigate to previous quiz answer",
			props.name,
			[...checked].map((i) => optionToString(options[i])).join(", "),
			isCorrect,
		);
		quiz.previous();
	}

	function onValidate() {
		const isCorrect =
			correctAnswers.length === checked.size &&
			correctAnswers.every((index) => {
				return checked.has(index);
			});
		trackQuizAnswer(
			"Validate quiz answer",
			props.name,
			[...checked].map((i) => optionToString(options[i])).join(", "),
			isCorrect,
		);
		quiz.setStatus(isCorrect === true ? QuizCardStatus.CORRECT : QuizCardStatus.INCORRECT);
	}

	const name = /** TODO: unique name */ "quiz";
	const type = isSingleChoice ? "radio" : "checkbox";

	const component = (
		<ul className="quiz-multiple-choice flex flex-col space-y-4">
			{options.map((option, index) => {
				return (
					<li key={index}>
						<label className="flex items-center space-x-4">
							<input
								type={type}
								name={name}
								onChange={() => {
									return toggle(index);
								}}
								checked={checked.has(index)}
							/>
							{option}
						</label>
					</li>
				);
			})}
		</ul>
	);

	return (
		<QuizCardLayout component={component} onValidate={onValidate} onNext={onNext} onPrev={onPrev}>
			{props.children}
		</QuizCardLayout>
	);
}

MultipleChoice.isQuizCard = true;

export interface MultipleChoiceOptionProps {
	children?: ReactNode;
	isCorrect?: boolean;
}

/**
 * Multiple choice option.
 */
export function MultipleChoiceOption(props: MultipleChoiceOptionProps): JSX.Element {
	return <span>{props.children}</span>;
}

/**
 * Type guard for MultipleChoiceOption component.
 */
export function isMultipleChoiceOption(
	component: JSX.Element,
): component is ReactElement<MultipleChoiceOptionProps> {
	return component.type === MultipleChoiceOption;
}

MultipleChoice.Option = MultipleChoiceOption;
