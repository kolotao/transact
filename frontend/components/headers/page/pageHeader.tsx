import { FC } from 'react';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { PageHeaderBreadcrumbs } from './pageHeaderBreadcrumbs';

export interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  lng: string;
  isBreadcrumb?: boolean;
}

/**
 * LayoutHeader renders the page header.
 *
 * @param {string} title - The title of the page, by default uses code for i18n.
 * @returns {JSX.Element} The page header.
 *
 * @example
 * ```tsx
 * <Layout.Page.Header titleCode='main_menu.home' />
 * ```
 */
export const PageHeader: FC<LayoutHeaderProps> = ({ title, lng, isBreadcrumb = true, className, children, ...props }) => {


  return (
    <div
      className={cn(
        'flex justify-between px-5 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-data-[collapsible=icon]:h-12 border-b border-border',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <PageHeaderBreadcrumbs title={title} lng={lng} isBreadcrumb = {isBreadcrumb} />
      </div>
        {children}
    </div>
  );
};
