import dynamic from "next/dynamic";

export const ClientProviders = dynamic(
  () => import("@/components/ClientProviders"),
  {
    ssr: false,
  }
);
export const HeaderLayout = dynamic(
  () => import("@/components/Layouts/HeaderLayout"),
  {
    ssr: false,
  }
);
export const SidebarComponent = dynamic(
  () => import("@/components/Sidebar/sidebar"),
  {
    ssr: false,
  }
);
