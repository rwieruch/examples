"use server";

import { setSessionCookie } from "@/lib/auth/cookie";
import { hashPassword } from "@/lib/auth/password";
import { createSession, generateRandomSessionToken } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const signUp = async (formData: FormData) => {
  const formDataRaw = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  if (formDataRaw.password !== formDataRaw.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const passwordHash = await hashPassword(formDataRaw.password);

    const user = await prisma.user.create({
      data: {
        firstName: formDataRaw.firstName,
        lastName: formDataRaw.lastName,
        email: formDataRaw.email,
        passwordHash,
      },
    });

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/
    // TODO: add error handling if user email is already taken
    // The Road to Next
  }

  redirect("/dashboard");
};

export { signUp };
