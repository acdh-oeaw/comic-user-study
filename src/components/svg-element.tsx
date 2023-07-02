import { Document, Page, pdfjs } from "react-pdf";

import { MatomoComponent } from "@/components/matomo-component";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface SvgElementProps {
	slide: number;
	title?: string;
}

/**
 * SvgElement.
 */
export function SvgElement(props: SvgElementProps): JSX.Element {
	const page = Number(props.slide);
	const matomoId = `comic-slide-${props.slide}`;

	return (
		<MatomoComponent id={matomoId}>
			<Document file={"/DYLENComic.pdf"} loading="Loading Comic...">
				<Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
			</Document>
		</MatomoComponent>
	);
}
