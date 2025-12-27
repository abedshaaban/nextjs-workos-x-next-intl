import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { authkit } from "@workos-inc/authkit-nextjs";
import { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const { headers: authkitHeaders } = await authkit(request);

  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  for (const [key, value] of authkitHeaders) {
    if (key.toLowerCase() === "set-cookie") {
      response.headers.append(key, value);
    } else {
      response.headers.set(key, value);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|trpc|.*\\..*).*)"],
};
