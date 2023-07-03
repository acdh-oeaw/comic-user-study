import Link from "next/link";

/**
 * StartButton.
 */
export function StartButton() {
	return (
		<button className="float-right mt-2 border bg-acdh-ch-primary p-3">
			<Link href={{ pathname: "/howto" }}>Start Experiment</Link>
		</button>
	);
}
