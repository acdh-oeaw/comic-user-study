import { useContext } from "react";
import { ResizableBox } from "react-resizable";

import { MainContentContext } from "@/components/Layout";

interface IframeProps {
	target: string;
	name?: string;
}

/**
 * Iframe.
 */
export function Iframe(props: IframeProps) {
	const mainContent = useContext(MainContentContext);

	const mainWidth = mainContent?.clientWidth || 0;
	return (
		<ResizableBox
			className="mb-2 rounded shadow-md"
			width={mainWidth}
			height={(mainWidth * 9.5) / 16}
			minConstraints={[100, 100]}
		>
			<iframe
				title={props.name}
				src={props.target}
				frameBorder="0"
				width="100%"
				height="100%"
				className="rounded"
			></iframe>
		</ResizableBox>
	);
}
