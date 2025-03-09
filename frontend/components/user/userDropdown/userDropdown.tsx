'use client';

import React, { FC, useCallback } from 'react';
import { ChevronsUpDown, CircleUser, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { User } from '@/store/features/users/types';
import { UserCard } from '../UserCard';
import { UserThemeSubmenu } from './userThemeSubmenu';
import { UserLanguageSubmenu } from './userLanguageSubmenu';
import { useAppDispatch } from '@/store/hooks';
import { logoutUser } from '@/store/features/auth/authThunks';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';

interface UserDropdownProps {
  user: User | null;
  lng: string;
}

/**
 * UserDropdown renders a dropdown menu with user details and actions.
 *
 * It includes submenus for theme and language selection,
 * an account action, and a logout option.
 *
 * @param user - User object to display in the dropdown.
 * @param lng - Current language, for building routes.
 * @returns A dropdown menu with user details and actions.
 *
 * @example
 * ```tsx
 * <UserDropdown user={user} lng="en" />
 * ```
 */
export const UserDropdown: FC<UserDropdownProps> = ({ user, lng }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { t } = useTranslation(lng, 'components');

  // UseCallback to memoize the signOut handler
  const signOut = useCallback(async () => {
    // Dispatch the logout thunk from Redux
    await dispatch(logoutUser());
    // Then navigate to login (or wherever)
    router.push(`/${lng}/auth/login`);
  }, [dispatch, router, lng]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* User card button to open dropdown */}
        <Button
          variant="ghost"
          className="w-full p-2 group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:p-0"
        >
          <UserCard user={user} lng={lng} />
          <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
        side={isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        {/* Display user card as a label */}
        <DropdownMenuLabel className="p-0 font-normal">
          <UserCard user={user} lng={lng} className="px-1 py-1.5" />
        </DropdownMenuLabel>

        {/* Base settings menu group */}
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <UserThemeSubmenu lng={lng} />
          <UserLanguageSubmenu lng={lng} />
        </DropdownMenuGroup>

        {user && (
          <>
            <DropdownMenuSeparator />

            {/* Account menu group */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUser />
                {t('user_dropdown.account')}
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Logout action */}
            <DropdownMenuItem onClick={signOut}>
              <LogOut />
              {t('user_dropdown.logout')}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
