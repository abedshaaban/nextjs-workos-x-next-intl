import { signOut, withAuth } from "@workos-inc/authkit-nextjs";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const { user } = await withAuth();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex gap-4 mb-8">
        <Link
          href="/en"
          className="text-blue-700 hover:underline px-2 py-1 rounded transition"
        >
          English
        </Link>
        <Link
          href="/fr"
          className="text-blue-700 hover:underline px-2 py-1 rounded transition"
        >
          French
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        {t("title")} {user?.firstName ?? ""}
      </h1>

      <div className="mt-2">
        {user?.email ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="bg-blue-600 text-white border border-blue-700 px-4 py-2 rounded text-sm cursor-pointer hover:bg-blue-700 transition"
            >
              Sign Out
            </button>
          </form>
        ) : (
          <Link
            href="/api/auth/login"
            className="bg-blue-600 text-white border border-blue-700 px-4 py-2 rounded text-sm cursor-pointer hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </main>
  );
}
