'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDashboardStats } from '@/store/features/stats/statsThunks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/app/i18n/client';
import { Loader } from '@/components/ui/loader';
import { RefreshCcw } from 'lucide-react';

interface DashboardStatsBlockProps {
  lng: string;
}

/**
 * DashboardStatsBlock component fetches and displays key statistics:
 * - Total users
 * - Total transactions
 * - Total accounts
 */
const DashboardStatsBlock: React.FC<DashboardStatsBlockProps> = ({ lng }) => {
  const dispatch = useAppDispatch();
  const { stats, loading, errorCode } = useAppSelector((state) => state.dashboardStats);
  const { t } = useTranslation(lng, 'translation');

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (errorCode) {
    return (
      <div className="text-sm text-red-500">
        {t(`errors.${errorCode}`)} <br />
        <Button onClick={() => dispatch(fetchDashboardStats())} className="mt-2">
          {t('pages.dashboard.stats_block.retry_button')}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* Total Users */}
        <Card className="col-span-2 min-w-3xs">
          <CardContent>
            <p className="text-sm text-gray-500">{t('pages.dashboard.stats_block.total_users')}</p>
            <p className="text-2xl font-bold">{stats?.totalUsers ?? 0}</p>
          </CardContent>
        </Card>

        {/* Total Transactions */}
        <Card className="col-span-2 sm:col-span-1 min-w-3xs">
          <CardContent>
            <p className="text-sm text-gray-500">{t('pages.dashboard.stats_block.total_transactions')}</p>
            <p className="text-2xl font-bold">{stats?.totalTransactions ?? 0}</p>
          </CardContent>
        </Card>

        {/* Total Accounts */}
        <Card className="col-span-2 sm:col-span-1 min-w-3xs">
          <CardContent>
            <p className="text-sm text-gray-500">{t('pages.dashboard.stats_block.total_accounts')}</p>
            <p className="text-2xl font-bold">{stats?.totalAccounts ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button */}
      <Button variant="outline" onClick={() => dispatch(fetchDashboardStats())} className="my-4">
        <RefreshCcw />
        {t('pages.dashboard.stats_block.update_button')}
      </Button>
    </>
  );
};

export default DashboardStatsBlock;
