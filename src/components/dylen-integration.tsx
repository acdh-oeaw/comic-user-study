export interface DylenIntegrationProps {
	slide: number;
	title?: string;
}

/**
 * DylenIntegration.
 */
export function DylenIntegration(): JSX.Element {
	return (
		<iframe
			title="dylen"
			src="https://dylen-tool.acdh.oeaw.ac.at"
			frameBorder="0"
			width="120%"
			height="500px"
			className="mb-2"
		></iframe>
	);
}
