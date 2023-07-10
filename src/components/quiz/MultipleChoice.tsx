import { type ReactElement, type ReactNode, useEffect } from "react";
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

// From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: Array<ReactNode>) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export async function getStaticProps(o: Array<ReactNode>) {
	return {
		props: {
			shuffledOptions: shuffle(o),
		},
	};
}

/**
 * Multiple choice quiz.
 */
export function MultipleChoice(props: MultipleChoiceProps): JSX.Element {
	const quiz = useQuiz();

	const childElements = getChildElements(props.children);
	const options = childElements.filter(isMultipleChoiceOption);

	const [shuffledOptions, setShuffledOptions] = useState([]);
	useEffect(() => {
		const randomOptions = shuffle(options);
		setShuffledOptions(randomOptions);
	}, []);

	const correctAnswers = shuffledOptions
		.filter((option) => {
			return option.props.isCorrect === true;
		})
		.map((option) => {
			return shuffledOptions.indexOf(option);
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
			[...checked].map((i) => optionToString(shuffledOptions[i])).join(", "),
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
			[...checked].map((i) => optionToString(shuffledOptions[i])).join(", "),
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
			[...checked].map((i) => optionToString(shuffledOptions[i])).join(", "),
			isCorrect,
		);
		quiz.setStatus(isCorrect === true ? QuizCardStatus.CORRECT : QuizCardStatus.INCORRECT);
	}

	const name = /** TODO: unique name */ "quiz";
	const type = isSingleChoice ? "radio" : "checkbox";

	const component = (
		<ul className="quiz-multiple-choice flex flex-col space-y-4">
			{shuffledOptions.map((option, index) => {
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
