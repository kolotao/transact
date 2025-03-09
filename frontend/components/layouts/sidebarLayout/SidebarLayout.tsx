'use client';

import { ReactNode, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { LayoutHeader } from './components/layoutHeader';
import { LayoutNavigation } from './components/layoutNavigation';
import { LayoutFooter } from './components/layoutFooter';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ExchangeRateBlock } from '@/components/data/exchangeRateBlcok';
import { fetchExchangeRates } from '@/store/features/exchangeRates/exchangeRatesThunks';

interface SidebarLayoutProps {
  children: ReactNode;
  lng: string;
}

/**
 * SidebarLayout is the main layout component that wraps the page with a sidebar.
 * It renders the sidebar (header, navigation, footer) alongside the main content area.
 *
 * @param {ReactNode} children - The main content area.
 * @returns {JSX.Element} The sidebar layout component.
 *
 * @example
 * ```tsx
 * <SidebarLayout>
 *   <div>Your page content goes here</div>
 * </SidebarLayout>
 * ```
 */
export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children, lng }) => {
  const dispatch = useAppDispatch();

  // Get current user from auth
  const { user } = useAppSelector((state) => state.auth);

  // Get exchangeRates from store
  const { list: exchangeRates, loading: ratesLoading, errorCode } = useAppSelector((state) => state.exchangeRates);

  // On mount, fetch exchange rates if not loaded yet
  useEffect(() => {
    if (exchangeRates.length === 0) {
      dispatch(fetchExchangeRates());
    }
  }, [dispatch, exchangeRates.length]);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        {/* Render the sidebar header */}
        <LayoutHeader />

        {/* Render the sidebar navigation or any other content... */}
        <SidebarContent>
          <SidebarGroup>
            <LayoutNavigation lng={lng} />
          </SidebarGroup>
        </SidebarContent>

        {/* Render the sidebar footer */}
        <SidebarFooter>
          <ExchangeRateBlock
            exchangeRates={exchangeRates}
            loading={ratesLoading}
            error={errorCode}
            sm
            className="group-data-[collapsible=icon]:!hidden truncate"
          />
          <LayoutFooter user={user} lng={lng} />
        </SidebarFooter>
      </Sidebar>

      {/* Main content area */}
      <SidebarInset className="[&_section]:p-5 [&_section]:overflow-x-auto">{children}</SidebarInset>
    </SidebarProvider>
  );
};
