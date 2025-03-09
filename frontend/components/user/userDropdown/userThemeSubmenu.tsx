import { FC } from 'react';
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/app/i18n/client';

/**
 * UserThemeSubmenu renders a submenu for theme selection:
 * - Light
 * - Dark
 * - System
 *
 * @returns {JSX.Element} The user theme submenu component.
 *
 * @example
 * ```tsx
 * <UserThemeSubmenu />
 * ```
 */
export const UserThemeSubmenu: FC<{ lng: string }> = ({ lng }) => {
  const { setTheme } = useTheme();
  const { t } = useTranslation(lng, 'components');

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <SunMoon className="w-5 h-5 mr-1" aria-hidden="true" />
        {t('user_dropdown.user_theme_submenu.choose_theme')}
      </DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme('light')}>
            {t('user_dropdown.user_theme_submenu.light')}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme('dark')}>
            {t('user_dropdown.user_theme_submenu.dark')}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme('system')}>
            {t('user_dropdown.user_theme_submenu.system')}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};
