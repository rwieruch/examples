"use server";

import { redirect } from "next/navigation";
import { getAuth, deleteSessionCookie } from "@/lib/auth/cookie";
import { invalidateSession } from "@/lib/auth/session";

const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect("/sign-in");
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect("/sign-in");
};

export { signOut };
