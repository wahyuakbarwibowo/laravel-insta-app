import { Link, router } from '@inertiajs/react';
import { LogOut } from "lucide-react";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { logout } from "@/routes";

export default function LogoutButton() {
  const cleanup = useMobileNavigation();

  const handleLogout = () => {
    cleanup();
    router.flushAll();
  };
  return (
    <Link
      className="block w-full"
      href={logout()}
      as="button"
      onClick={handleLogout}
      data-test="logout-button"
    >
      <LogOut className="mr-2" />
      Log out
    </Link>
  );
}
