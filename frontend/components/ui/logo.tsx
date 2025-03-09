import React from 'react';

import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

/**
 * Logo renders the application logo along with the title.
 * The component is linked to the home page and adapts to the SidebarLayout.
 *
 * @param {string} className - The additional classes to apply to the component.
 * @returns {JSX.Element} The logo component.
 *
 * @example
 * ```tsx
 * <Logo className='p-2' />
 * ```
 */
export const Logo: React.FC<LogoProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Link href="/" className={cn('flex items-center space-x-2 overflow-hidden', className)}>
      <Image src={'/logo.svg'} width={30} height={30} alt="Logo" />
      <p className="text-xs font-semibold">Transact</p>
    </Link>
  );
};