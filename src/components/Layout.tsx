import { createContext, type ReactNode, useState } from "react";
import { Fragment } from "react";

export interface LayoutProps {
	children: ReactNode;
}
export const MainContentContext = createContext(null);
/**
 * Default page layout.
 */
export function Layout(props: LayoutProps): JSX.Element {
	const { children } = props;
	const [mainContent, setMainContent] = useState(null);
	return (
		<Fragment>
			<div className="grid min-h-screen grid-rows-page-layout">
				<main
					tabIndex={-1}
					className="focus:outline-none focus-visible:ring focus-visible:ring-inset focus-visible:ring-brand-blue"
				>
					<div className="grid bg-gradient-to-r from-brand-blue to-brand-turquoise text-white">
						<header className="mx-auto grid w-full max-w-6xl gap-8 px-8 py-12">
							<dl className="min-w-0">
								<div className="">
									<dt className="sr-only inline">Tags:</dt>
									<dd className="inline">
										<ul className="inline text-xs font-bold uppercase tracking-wide text-brand-black">
											<li className="inline">
												<span>User Test</span>
											</li>
										</ul>
									</dd>
								</div>
							</dl>
							<h1 className="min-w-0 break-words text-5xl font-black tracking-tighter 2xs:text-6xl xs:text-7xl">
								DYLEN
							</h1>
							<dl className="grid min-w-0 grid-cols-2 items-center border-t border-neutral-200 py-4 text-sm font-medium text-neutral-100">
								<div className="min-w-0 space-y-1"></div>
							</dl>
						</header>
					</div>
					<div className="mx-auto grid w-full max-w-screen-lg space-y-10 px-10 pb-16 pt-12 2xl:max-w-none 2xl:gap-x-10 2xl:space-y-0">
						<div className="min-w-0">
							<div className="mx-auto w-full max-w-6xl space-y-16" ref={setMainContent}>
								<MainContentContext.Provider value={mainContent}>
									<div className="prose prose-sm max-w-none sm:prose sm:max-w-none">{children}</div>
								</MainContentContext.Provider>
							</div>
						</div>
					</div>
				</main>
			</div>
		</Fragment>
	);
}
