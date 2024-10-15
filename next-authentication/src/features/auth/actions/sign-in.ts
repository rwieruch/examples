"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPasswordHash } from "@/lib/auth/password";
import { generateRandomSessionToken, createSession } from "@/lib/auth/session";
import { setSessionCookie } from "@/lib/auth/cookie";

const signIn = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // TODO: validate formDataRaw (and retrieve typed formData) before proceeding
  // https://www.robinwieruch.de/next-forms/

  try {
    const user = await prisma.user.findUnique({
      where: { email: formDataRaw.email },
    });

    if (!user) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error("Incorrect email or password");
    }

    const validPassword = await verifyPasswordHash(
      user.passwordHash,
      formDataRaw.password
    );

    if (!validPassword) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error("Incorrect email or password");
    }

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/
  }

  redirect("/dashboard");
};

export { signIn };
