import { cookies } from "next/headers";
import { fetchSessionUserFromBackend } from "./session-gateway";
import type { SessionUser } from "../types/session-user";

export async function getServerSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("vetark_session");

  if (!sessionCookie) {
    return null;
  }

  return fetchSessionUserFromBackend(
    `${sessionCookie.name}=${sessionCookie.value}`,
  );
}
