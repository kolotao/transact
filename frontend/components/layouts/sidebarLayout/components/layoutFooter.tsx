import { FC } from 'react';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { User } from '@/store/features/users/types';
import { UserDropdown } from '@/components/user/userDropdown/userDropdown';

/**
 * LayoutFooter renders the footer section of the sidebar layout,
 * including:
 * - User dropdown menu
 *
 * @param user - User object to display in the dropdown.
 * @returns The sidebar footer component.
 *
 * @example
 * ```tsx
 * <LayoutFooter user={user} />
 * ```
 */
export const LayoutFooter: FC<{ user: User | null; lng: string }> = ({ user, lng }) => {

  return (
    <SidebarMenu>
      <SidebarMenuItem><UserDropdown user={user} lng={lng} /></SidebarMenuItem>
    </SidebarMenu>
  );
};
