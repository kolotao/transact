import { FC } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User } from '@/store/features/users/types';
import { KeyRound } from 'lucide-react';

interface UserAvatarProps {
  user: User | null;
  className?: string;
}

/**
 * UserAvatar renders the user's avatar.
 * If the avatar image is not available, it falls back to the user's initials.
 *
 * @param user - User object containing profile data.
 * @returns JSX.Element representing the user avatar.
 */
export const UserAvatar: FC<UserAvatarProps> = ({ user, className }) => {
  if (!user)
    return (
      <Avatar className={cn('h-8 w-8 rounded-sm', className)}>
        <AvatarFallback className="rounded-sm">
          <KeyRound />
        </AvatarFallback>
      </Avatar>
    );

  // Returns the initials of the user (first character of firstname and lastname).
  const getUserInitials = () => {
    if (!user) return '';
    const { firstName, lastName } = user;
    return `${firstName ? firstName.charAt(0) : 'A'}${lastName ? lastName.charAt(0) : 'N'}`.toUpperCase();
  };

  return (
    <Avatar className={cn('h-8 w-8 rounded-sm', className)}>
      <AvatarFallback className="rounded-sm">{getUserInitials()}</AvatarFallback>
    </Avatar>
  );
};
