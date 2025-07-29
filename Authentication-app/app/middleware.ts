import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const protectedPaths = ["/dashboard"];
    const isProtectedPath = protectedPaths.some((protectedPath) =>
      path.startsWith(protectedPath)
    );

    if (isProtectedPath) {
      const token = await getToken({
        req: request,
        secret:
          process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
      });

      if (!token) {
        const url = new URL("/login", request.url);
        url.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
