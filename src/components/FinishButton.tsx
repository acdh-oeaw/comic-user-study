import Link from "next/link";

/**
 * FinishButton.
 */
export function FinishButton() {
	return (
		<button className="float-right mt-2 border bg-acdh-ch-primary p-3">
			<Link href={{ pathname: "/done" }}>Finish Experiment</Link>
		</button>
	);
}
