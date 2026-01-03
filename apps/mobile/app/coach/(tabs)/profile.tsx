import { useRouter } from "expo-router";
import { ProfileScreen, useLogout, useDeactivateProfile, useUpdateUnitPreference } from "../../../src/features/profile";
import { useAuthState } from "../../../src/store/authState";

export default function CoachProfilePage() {
  const router = useRouter();
  const user = useAuthState((state) => state.user);
  const logoutMutation = useLogout();
  const deactivateMutation = useDeactivateProfile();
  const updateUnitMutation = useUpdateUnitPreference();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.replace("/login");
  };

  const handleDeactivate = async () => {
    await deactivateMutation.mutateAsync();
  };

  const handleUpdateUnitPreference = async (preference: "gram") => {
    await updateUnitMutation.mutateAsync(preference);
  };

  if (!user) {
    return null;
  }

  return <ProfileScreen user={user} onLogout={handleLogout} onDeactivate={handleDeactivate} onUpdateUnitPreference={handleUpdateUnitPreference} isLoading={logoutMutation.isPending} />;
}
