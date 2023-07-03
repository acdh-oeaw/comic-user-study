import cx from "clsx";

import { ActionButton } from "@/components/quiz/ActionButton";
import { QuizCardStatus, useQuiz } from "@/components/quiz/Quiz";

export interface QuizControlsProps {
	onValidate?: () => void;
	onNext: () => void;
	onPrev: () => void;
}

/**
 * Quiz controls.
 */
export function QuizControls(props: QuizControlsProps): JSX.Element {
	const quiz = useQuiz();

	const buttonVariants = {
		[QuizCardStatus.UNANSWERED]: undefined,
		[QuizCardStatus.INCORRECT]: "error" as const,
		[QuizCardStatus.CORRECT]: "success" as const,
	};

	function getButtonVariant(status: QuizCardStatus | undefined) {
		if (status === undefined) return undefined;
		return buttonVariants[status];
	}

	const isSingleQuestionQuiz = !quiz.hasPrevious && !quiz.hasNext;

	return (
		<div
			className={cx(
				"flex items-center space-x-2",
				isSingleQuestionQuiz ? "justify-center" : "justify-between",
			)}
		>
			{!isSingleQuestionQuiz ? (
				<ActionButton
					isDisabled={!quiz.hasPrevious}
					onPress={props.onPrev}
					variant={getButtonVariant(quiz.previousStatus)}
				>
					{quiz.labels.previous}
				</ActionButton>
			) : null}
			{!props.onValidate ? (
				<div>
					<ActionButton onPress={props.onValidate} variant={getButtonVariant(quiz.status)}>
						{quiz.labels.validate}
					</ActionButton>
				</div>
			) : null}
			{!isSingleQuestionQuiz ? (
				<ActionButton
					isDisabled={!quiz.hasNext}
					onPress={props.onNext}
					variant={getButtonVariant(quiz.nextStatus)}
				>
					{quiz.labels.next}
				</ActionButton>
			) : null}
		</div>
	);
}
