import { FC } from 'react';
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useTranslation } from '@/app/i18n/client';
import { languages } from '@/app/i18n/settings';
import { useRouter } from 'next/navigation'

/**
 * UserLanguageSubmenu renders a submenu for language selection.
 *
 * @returns {JSX.Element} A dropdown submenu with available languages.
 *
 * @example
 * ```tsx
 * <UserLanguageSubmenu />
 * ```
 */
export const UserLanguageSubmenu: FC<{ lng: string }> = ({ lng }) => {
  const { t, i18n } = useTranslation(lng, 'components');
  const router = useRouter()
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    router.push(`/${code}`);
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Languages className="w-5 h-5 mr-1" aria-hidden="true" />
        {t('user_dropdown.user_language_submenu.choose_language')}
      </DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {languages.map((language) => (
            <DropdownMenuItem key={language} onClick={() => changeLanguage(language)}>
              {language}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};
