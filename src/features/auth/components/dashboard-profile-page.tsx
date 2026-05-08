import { DashboardProfile, DashboardProfileError } from "@/features/auth/components/dashboard-profile";
import { getCurrentUser } from "@/lib/auth/server-auth";

export async function DashboardProfilePage(
 
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return (
        <DashboardProfileError
          message="We could not load your account details at the moment."
        />
      );
    }

    return <DashboardProfile user={user} />;
  } catch (error) {
   

    return (
      <DashboardProfileError
        message={
          error instanceof Error
            ? error.message
            : "We could not load your account details at the moment."
        }
      />
    );
  }
}
