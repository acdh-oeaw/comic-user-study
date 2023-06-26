import { type ReactNode } from "react";

export interface MatomoComponentProps {
	id?: string;
	children: ReactNode;
}

/**
 * MatomoComponent.
 */
export function MatomoComponent(props: MatomoComponentProps): JSX.Element {
	return (
		<div data-track-content data-content-name={props.id}>
			{props.children}
		</div>
	);
}
