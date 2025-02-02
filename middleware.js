// import { NextResponse } from "next/server";

// export function middleware(request) {
//   return NextResponse.redirect(new URL("/login", request.url));
// }

import { auth } from "@/app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: [
    "/account",
    "/account/profile",
    "/account/reservations",
    "/account/reservations/edit",
  ],
};
