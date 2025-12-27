import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <>
      <div className="flex gap-2">
        <Link href="/en">English</Link>
        <Link href="/fr">French</Link>
      </div>

      <h1>{t("title")}</h1>
    </>
  );
}
