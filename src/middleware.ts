import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

export function middleware(request: NextRequest) {
	// TODO:

	if (Math.random() >= 0.5) {
		return NextResponse.redirect(new URL("/howto/b", request.url));
	}

	return NextResponse.redirect(new URL("/howto/a", request.url));
}

export const config = {
	matcher: "/howto",
};
