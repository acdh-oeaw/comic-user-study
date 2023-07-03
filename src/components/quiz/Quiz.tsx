import { type ReactNode } from "react";
import { createContext, useContext, useState } from "react";

import { type Values } from "@/components/quiz/enum";
import { getChildElements } from "@/components/quiz/getChildElements";
import { MultipleChoice } from "@/components/quiz/MultipleChoice";
import { isQuizCard, QuizCard } from "@/components/quiz/QuizCard";
import { QuizMessage } from "@/components/quiz/QuizMessage";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { TextInput } from "@/components/quiz/TextInput";
// import { useI18n } from "@/i18n/useI18n";

export interface QuizService {
	hasNext: boolean;
	hasPrevious: boolean;
	next: () => void;
	previous: () => void;
	setStatus: (status: QuizCardStatus) => void;
	status: QuizCardStatus;
	nextStatus: QuizCardStatus | undefined;
	previousStatus: QuizCardStatus | undefined;
	isHidden: boolean;
	labels: {
		validate: string;
		next: string;
		previous: string;
	};
}

const QuizContext = createContext<QuizService | null>(null);

export function useQuiz(): QuizService {
	const state = useContext(QuizContext);

	if (state === null) {
		throw new Error("`useQuiz` must be nested inside a `Quiz`.");
	}

	return state;
}

export const QuizCardStatus = {
	UNANSWERED: "unanswered",
	INCORRECT: "incorrect",
	CORRECT: "correct",
} as const;
export type QuizCardStatus = Values<typeof QuizCardStatus>;

export interface QuizProps {
	children?: ReactNode;
}

/**
 * Quiz.
 */
export function Quiz(props: QuizProps): JSX.Element | null {
	// const { t } = useI18n();

	const childElements = getChildElements(props.children);
	const cards = childElements.filter(isQuizCard);
	const nonCards = childElements.filter((c) => !isQuizCard(c));

	const [cardsStatus, setCardsStatus] = useState<Array<QuizCardStatus>>(
		Array(cards.length).fill(QuizCardStatus.UNANSWERED),
	);
	const [currentIndex, setCurrentIndex] = useState(0);
	const hasNext = currentIndex < cards.length - 1;
	const hasPrevious = currentIndex > 0;

	function next() {
		if (hasNext) {
			setCurrentIndex((currentIndex) => {
				return currentIndex + 1;
			});
		}
	}

	function previous() {
		if (hasPrevious) {
			setCurrentIndex((currentIndex) => {
				return currentIndex - 1;
			});
		}
	}

	if (cards.length === 0) return null;

	return (
		<aside>
			{cards.map((card, index) => {
				function setStatus(status: QuizCardStatus) {
					setCardsStatus((cardsStatus) => {
						const newCardsStatus = [...cardsStatus];
						newCardsStatus[index] = status;
						return newCardsStatus;
					});
				}

				/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
				const status = cardsStatus[index]!;
				const nextStatus = cardsStatus[index + 1];
				const previousStatus = cardsStatus[index - 1];
				/** Hidden quiz cards are rendered but hidden, in order to preserve component state. */
				const isHidden = index !== currentIndex;

				const labels = {
					validate: card.props.validateButtonLabel ?? "Validate",
					next: "Next",
					previous: "Previous",
				};

				const service = {
					hasNext,
					hasPrevious,
					next,
					previous,
					setStatus,
					status,
					nextStatus,
					previousStatus,
					isHidden,
					labels,
				};

				return (
					<QuizContext.Provider key={index} value={service}>
						{card}
					</QuizContext.Provider>
				);
			})}

			{nonCards}
		</aside>
	);
}

Quiz.Card = QuizCard;
Quiz.Question = QuizQuestion;
Quiz.Message = QuizMessage;
Quiz.MultipleChoice = MultipleChoice;
Quiz.TextInput = TextInput;
