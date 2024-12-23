// app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { users } from "./user";
export async function login(username: string, password: string) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    (await cookies()).set("user", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid credentials" };
}

// app/lib/auth.ts
