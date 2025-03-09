import { FC } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { mainMenu, MenuItem } from '@/lib/menu';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';


/**
 * LayoutNavigation renders the navigation menu based on the appRoutes configuration.
 * It filters out routes that are not meant to be visible in the sidebar.
 *
 * @returns {JSX.Element} The sidebar navigation component.
 *
 * @example
 * ```tsx
 * <LayoutNavigation />
 * ```
 */
interface LayoutNavigationProps {
  lng: string;
}

export const LayoutNavigation: FC<LayoutNavigationProps> = ({ lng }) => {

  return (
    <nav aria-label="Main Navigation">
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          <LayoutMenuItems routes={mainMenu} lng={lng} />
        </SidebarMenu>
      </SidebarGroupContent>
    </nav>
  );
};

interface LayoutMenuItemsProps {
  routes: MenuItem[];
  lng: string;
}

/**
 * LayoutMenuItems renders the navigation items based on the provided routes.
 *
 * @param {MenuItem[]} routes - The list of navigation items to render.
 * @returns {JSX.Element} The navigation items component.
 *
 * @example
 * ```tsx
 * <LayoutMenuItems routes={appRoutes} />
 * ```
 */
const LayoutMenuItems: FC<LayoutMenuItemsProps> = ({ routes, lng }) => {
  const { t } = useTranslation(lng, 'menu');

  if (routes.length === 0) return <div className="p-2 text-sm">No navigation available</div>;

  return (
    <>
      {routes.map((item) => (
        <SidebarMenuItem key={item.code}>
          <SidebarMenuButton asChild size={'sm'} tooltip={t(`main_menu.${item.code}`)}>
            <Link href={`/${lng}/${item.path}`} aria-label={t(`main_menu.${item.code}`)}>
              {item.icon && <item.icon aria-hidden="true" />}

              <span>{t(`main_menu.${item.code}`)}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-auto" aria-hidden="true" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};
