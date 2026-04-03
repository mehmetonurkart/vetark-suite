import { redirect } from "next/navigation";
import { DashboardPage } from "../src/features/dashboard/dashboard-page";
import { getServerSessionUser } from "../src/features/login/api/session-server";

export default async function Home() {
  const user = await getServerSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <DashboardPage user={user} />;
}
