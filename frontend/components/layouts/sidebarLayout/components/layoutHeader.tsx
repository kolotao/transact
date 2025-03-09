import { FC } from 'react'
import {
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/ui/logo'

/**
 * Component renders the header section of the sidebar,
 * including:
 * - Logo
 * - ...
 *
 * @returns {JSX.Element} The sidebar header component.
 *
 * @example
 * ```tsx
 * <LayoutHeader />
 * ```
 */
export const LayoutHeader: FC = () => {
  return (
    <SidebarHeader>
      <header>
        {/* Logotype component*/}
        <Logo className='p-2 group-data-[collapsible=icon]:!p-0' />
        {/* <p className='p-2 group-data-[collapsible=icon]:!p-0' >Logo</p> */}
      </header>
    </SidebarHeader>
  )
}
