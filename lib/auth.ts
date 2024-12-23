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
export async function signOut() {
  // Delete the user cookie
  (
    await // Delete the user cookie
    cookies()
  ).delete("user");
  return { success: true };
}
export async function ifLoggedIn() {
  const user = (await cookies()).get("user");
  if (user) return { success: true };
}
