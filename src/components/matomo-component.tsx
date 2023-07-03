import { type ReactNode } from "react";
import { useInView } from "react-intersection-observer";

import { trackElementVisibility } from "@/lib/analytics";

export interface MatomoComponentProps {
	id?: string;
	children: ReactNode;
}

/**
 * MatomoComponent.
 */
export function MatomoComponent(props: MatomoComponentProps): JSX.Element {
	const { ref, entry } = useInView({
		/* Optional options */
		threshold: 0,
		initialInView: false,
		onChange: (inView) => {
			if (inView || entry) {
				trackElementVisibility(props.id || "unknown", inView);
			}
		},
	});
	return (
		<div ref={ref} data-track-content data-content-name={props.id}>
			{props.children}
		</div>
	);
}
