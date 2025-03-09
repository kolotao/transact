import { FC } from 'react';
import { cn } from '@/lib/utils';
import { User } from '@/store/features/users/types';
import { UserAvatar } from './UserAvatar';
import { useTranslation } from '@/app/i18n/client';

interface UserCardProps {
  user: User | null;
  lng: string;
  className?: string;
}

/**
 * UserCard displays the user's avatar along with their name and email.
 *
 * @param user - User object containing profile data.
 * @param className - Additional classes to apply to the user card.
 * @returns JSX.Element representing the user card.
 *
 * @example
 * ```tsx
 * <UserCard user={user} />
 * ```
 */
export const UserCard: FC<UserCardProps> = ({ user, lng, className }) => {
    const { t } = useTranslation(lng, 'components');
  return (
    <div className={cn('flex gap-2 items-center overflow-hidden', className)}>
      <UserAvatar user={user} className="group-data-[collapsible=icon]:w-[31px]" />
      <div className="flex flex-col text-left text-xs leading-tight">
        <span className="truncate font-semibold">
            {user ? `${user.firstName} ${user.lastName}` : t('user.user_card.guest')}
        </span>
        <span className="truncate text-[10px]">{user ? user.email : t('user.user_card.login')}</span>
      </div>
    </div>
  );
};