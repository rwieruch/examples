import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/cookie";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuth();

  if (!user) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
