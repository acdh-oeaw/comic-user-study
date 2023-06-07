import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

export function middleware(request: NextRequest) {
	// TODO:

	return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
	matcher: "/howto/:path*",
};
