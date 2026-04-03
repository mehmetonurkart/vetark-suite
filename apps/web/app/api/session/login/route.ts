import { proxySessionRequest } from "../../../../src/features/login/api/session-gateway";

export async function POST(request: Request) {
  return proxySessionRequest({
    method: "POST",
    path: "/login",
    body: await request.text(),
    contentType: "application/json",
    cookieHeader: request.headers.get("cookie"),
    unavailableMessage:
      "Giris servisine ulasilamadi. Web ve API uygulamasinin birlikte calistigini kontrol edin.",
  });
}
