// hooks/usePageConfig.ts
'use client'
import { usePathname } from 'next/navigation';

export function usePageConfigHome (config: {
  showHeader: string[],
  showSidebar: string[],
  hideSidebar: string[]
}) {
  const pathname = usePathname();

  const activePage = pathname === '/'
    ? 'listenNow'
    : pathname.includes('/learning-paths')
    ? 'browse'
    : pathname.includes('/blog')
    ? 'radio'
    : '';

  const showHeader = config.showHeader.some(page => pathname.startsWith(page));
  const showSidebar = !config.hideSidebar.some(page => pathname.startsWith(page)) &&
    config.showSidebar.some(page => pathname.startsWith(page));

  return {
    activePage,
    showHeader,
    showSidebar
  };
}
