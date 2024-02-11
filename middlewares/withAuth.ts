import {
  NextResponse,
  NextRequest,
  NextMiddleware,
  NextFetchEvent,
} from "next/server";

const onlyAdmin = ["admin"];
const authPage = ["auth"];

export default function WithAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];

    if (requireAuth.includes(pathname)) {
      const tokenString = localStorage.getItem("token");

      if (!tokenString) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      // Assuming token is a JSON string representing an object
      const token = JSON.parse(tokenString);

      if (authPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return middleware(req, next);
  };
}
