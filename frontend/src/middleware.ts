import { NextRequest, NextResponse } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  
  if (!authToken && request.nextUrl.pathname !== "/sign-in" && request.nextUrl.pathname !== "/sign-up") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:slug" , "/" , "/sign-in" , "/sign-up"],
};