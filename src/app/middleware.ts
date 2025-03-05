import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host")!;
  const subdomain = hostname.match(/^([^.]+)\./)?.[1];

  if (!subdomain || subdomain === "www") {
    // Main domain (kayroye.com or www.kayroye.com) should go to the portfolio
    return NextResponse.rewrite(new URL(`/app${req.nextUrl.pathname}`, req.url));
  }

  if (subdomain.startsWith("blog")) {
    // blog.kayroye.com should go to the blog
    return NextResponse.rewrite(new URL(`/blog${req.nextUrl.pathname}`, req.url));
  }

  return NextResponse.next();
}
