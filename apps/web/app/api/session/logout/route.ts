import { proxySessionRequest } from "../../../../src/features/login/api/session-gateway";

export async function POST(request: Request) {
  return proxySessionRequest({
    method: "POST",
    path: "/login/logout",
    body: "{}",
    contentType: "application/json",
    cookieHeader: request.headers.get("cookie"),
    unavailableMessage:
      "Cikis islemi tamamlanamadi. API baglantisini kontrol edin.",
  });
}
