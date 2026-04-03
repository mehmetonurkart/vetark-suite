import { proxySessionRequest } from "../../../../src/features/login/api/session-gateway";

export async function GET(request: Request) {
  return proxySessionRequest({
    method: "GET",
    path: "/login/me",
    cookieHeader: request.headers.get("cookie"),
    unavailableMessage:
      "Oturum bilgisi su anda okunamiyor. API baglantisini kontrol edin.",
  });
}
