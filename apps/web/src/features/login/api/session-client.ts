import type { LoginCredentials, SessionUser } from "../types/session-user";

interface SessionResponse {
  user: SessionUser;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });
  } catch {
    throw new Error(
      "Giriş servisine ulaşılamadı. Web ve API uygulamasının birlikte çalıştığını kontrol edin.",
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  const payload =
    response.status === 204
      ? undefined
      : contentType.includes("application/json")
        ? await response.json()
        : await response.text();

  if (!response.ok) {
    const fallbackMessage = "İstek başarısız oldu.";

    if (payload && typeof payload === "object") {
      const errorPayload = payload as {
        message?: string | string[];
      };
      const message = Array.isArray(errorPayload.message)
        ? errorPayload.message[0]
        : errorPayload.message;

      throw new Error(message ?? fallbackMessage);
    }

    throw new Error(fallbackMessage);
  }

  if (response.status === 204 || payload === undefined) {
    return undefined as T;
  }

  return payload as T;
}

export async function loginWithCredentials(
  credentials: LoginCredentials,
): Promise<SessionUser> {
  const response = await request<SessionResponse>("/api/session/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  return response.user;
}

export async function getSessionUser(): Promise<SessionUser> {
  const response = await request<SessionResponse>("/api/session/me", {
    method: "GET",
  });

  return response.user;
}

export async function logoutSession(): Promise<void> {
  await request<{ success: true }>("/api/session/logout", {
    method: "POST",
    body: JSON.stringify({}),
  });
}
