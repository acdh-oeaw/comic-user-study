import { type ReactNode } from "react"

interface SideNoteProps {
	children: ReactNode
}

export function SideNote(props: SideNoteProps) {
	const { children } = props

	return (
		<aside className="text-red-500">
			{children}
		</aside>
	)
}
