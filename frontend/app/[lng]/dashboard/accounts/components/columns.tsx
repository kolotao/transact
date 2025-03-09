'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Account } from '@/store/features/accounts/types';
import { ArrowUpDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { shortId } from '@/lib/utils';

export const Columns = (t: (key: string) => string, lng: string): ColumnDef<Account>[] => {
  return [
    {
      accessorKey: 'id',
      header: t('pages.accounts.columns.id'),
      cell: ({ row }) => {
        const data = row.original;
        return shortId(data.id);
      }
    },
    {
      accessorKey: 'currency',
      header: t('pages.accounts.columns.currency'),
    },
    {
      accessorKey: 'balance',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {t('pages.accounts.columns.balance')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {t('pages.accounts.columns.created_at')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue<string>('createdAt');
        return new Date(date).toLocaleDateString();
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className='text-right'>
            <Button variant="ghost" size={'sm'} asChild>
              <Link href={`accounts/${data.id}`}>
                <ArrowUpRight className="h-4 w-4" />
                {t('pages.accounts.columns.actions.details_button')}
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">{t('pages.accounts.columns.actions.open_button')}</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('pages.accounts.columns.actions.actions')}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.id)}>
                  {t('pages.accounts.columns.actions.copy_id_button')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`${lng}/dashboard/accounts/${data.id}`}>
                    {t('pages.accounts.columns.actions.details_button')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>{t('pages.accounts.columns.actions.edit_button')}</DropdownMenuItem>
                <DropdownMenuItem>{t('pages.accounts.columns.actions.delete_button')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
