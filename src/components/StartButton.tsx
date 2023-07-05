import Link from "next/link";

/**
 * StartButton.
 */
export function StartButton() {
	const randomPath = Math.random() >= 0.5 ? "/howto/article" : "/howto/comic";
	return (
		<button className="float-right mt-2 border bg-acdh-ch-primary p-3">
			<Link href={{ pathname: randomPath }}>Start Experiment</Link>
		</button>
	);
}
