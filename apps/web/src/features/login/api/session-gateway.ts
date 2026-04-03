import "server-only";

import { NextResponse } from "next/server";
import type { SessionUser } from "../types/session-user";

const BACKEND_API_BASE_URL =
  process.env.VETARK_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000/api";

interface ProxyRequestOptions {
  body?: string;
  contentType?: string;
  cookieHeader?: string | null;
  method: "GET" | "POST";
  path: string;
  unavailableMessage: string;
}

function getSetCookieHeaders(headers: Headers): string[] {
  const headersWithCookieAccess = headers as Headers & {
    getSetCookie?: () => string[];
  };

  if (typeof headersWithCookieAccess.getSetCookie === "function") {
    return headersWithCookieAccess.getSetCookie();
  }

  const cookieHeader = headers.get("set-cookie");

  return cookieHeader ? [cookieHeader] : [];
}

function buildTargetUrl(path: string): string {
  return `${BACKEND_API_BASE_URL}${path}`;
}

function createProxyResponse(response: Response, bodyText: string): NextResponse {
  const nextResponse = new NextResponse(bodyText, {
    status: response.status,
  });
  const contentType = response.headers.get("content-type");

  if (contentType) {
    nextResponse.headers.set("Content-Type", contentType);
  }

  for (const cookie of getSetCookieHeaders(response.headers)) {
    nextResponse.headers.append("Set-Cookie", cookie);
  }

  return nextResponse;
}

export async function proxySessionRequest({
  body,
  contentType,
  cookieHeader,
  method,
  path,
  unavailableMessage,
}: ProxyRequestOptions): Promise<NextResponse> {
  try {
    const response = await fetch(buildTargetUrl(path), {
      method,
      body,
      cache: "no-store",
      headers: {
        ...(contentType ? { "Content-Type": contentType } : {}),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    });
    const bodyText = response.status === 204 ? "" : await response.text();

    return createProxyResponse(response, bodyText);
  } catch {
    return NextResponse.json(
      {
        message: unavailableMessage,
      },
      {
        status: 503,
      },
    );
  }
}

export async function fetchSessionUserFromBackend(
  sessionCookie: string,
): Promise<SessionUser | null> {
  try {
    const response = await fetch(buildTargetUrl("/login/me"), {
      cache: "no-store",
      headers: {
        Cookie: sessionCookie,
      },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { user: SessionUser };

    return payload.user;
  } catch {
    return null;
  }
}
