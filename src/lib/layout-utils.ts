/**
 * Helper to determine whether the public website Header (Navbar) and Footer
 * should be hidden for specific internal portals and dashboards.
 */
export function shouldHideHeaderFooter(pathname: string | null): boolean {
  if (!pathname) return false;

  // 1. Admin Login & Admin Dashboard (including all sub-routes)
  if (
    pathname.startsWith("/sysadmin") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard/admin")
  ) {
    return true;
  }

  // 2. Staff Login & Staff Dashboard (including all sub-routes)
  if (
    pathname.startsWith("/staff") ||
    pathname.startsWith("/dashboard/employee") ||
    pathname.startsWith("/dashboard/staff")
  ) {
    return true;
  }

  return false;
}
