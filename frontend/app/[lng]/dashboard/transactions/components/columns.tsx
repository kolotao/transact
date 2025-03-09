'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/store/features/transactions/types';
import { shortId } from '@/lib/utils';

export const Columns = (t: (key: string) => string): ColumnDef<Transaction>[] => {
  return [
    {
      accessorKey: 'id',
      header: t('pages.transactions.columns.id'),
      cell: ({ row }) => {
        const data = row.original;
        return shortId(data.id);
      },
    },
    {
      accessorKey: 'fromAccountId',
      header: t('pages.transactions.columns.from_account_id'),
      cell: ({ row }) => {
        const data = row.original;
        return shortId(data.fromAccountId);
      },
    },
    {
      accessorKey: 'toAccountId',
      header: t('pages.transactions.columns.to_account_id'),
      cell: ({ row }) => {
        const data = row.original;
        return shortId(data.toAccountId);
      },
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {t('pages.transactions.columns.amount')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'currency',
      header: t('pages.transactions.columns.currency'),
    },
    {
        accessorKey: 'description',
        header: t('pages.transactions.columns.description'),
      },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {t('pages.transactions.columns.created_at')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue<string>('createdAt');
        return new Date(date).toLocaleDateString();
      },
    },
  ];
};
