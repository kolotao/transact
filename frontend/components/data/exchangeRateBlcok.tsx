'use client';

import React, { FC, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { ExchangeRate } from '@/store/features/exchangeRates/types';
import { cn, roundNumber } from '@/lib/utils';
import { Button } from '../ui/button';
import { Loader } from '../ui/loader';

interface ExchangeRateBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  exchangeRates: ExchangeRate[];
  loading: boolean;
  error: string | null;
  sm?: boolean;
}

/**
 * ExchangeRateBlock displays a small UI for exchange rates,
 * allowing the user to pick a "fromCurrency" (e.g., USD, EUR, JPY)
 * and see all rates that originate from that currency.
 *
 * @param exchangeRates - The list of ExchangeRate objects.
 * @param loading - Whether the data is currently loading.
 * @param error - An error code.
 * @param sm - If true, uses smaller text for a compact display.
 * @param className - Extra class names to style the container.
 *
 * @example
 * ```tsx
 * <ExchangeRateBlock
 *   exchangeRates={exchangeRates}
 *   loading={false}
 *   error={null}
 *   sm
 * />
 * ```
 */
export const ExchangeRateBlock: FC<ExchangeRateBlockProps> = ({
  exchangeRates,
  loading,
  error,
  sm = false,
  className,
  ...props
}) => {
  // CSS classes for smaller text spacing if `sm` is true
  const baseClasses = sm ? 'text-xs py-2 px-2' : '';
  const [selectedFrom, setSelectedFrom] = useState('USD');

  if (loading) {
    return (
      <Card className={cn(baseClasses, className)} {...props}>
        <CardContent className="flex justify-center">
          <Loader className="my-4" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn(baseClasses, className)} {...props}>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const filteredRates = exchangeRates.filter((rate) => rate.fromCurrency === selectedFrom);
  // Collect all unique "fromCurrency" options
  const uniqueFromCurrencies = Array.from(new Set(exchangeRates.map((r) => r.fromCurrency)));

  return (
    <Card className={cn(baseClasses, className)} {...props}>
      <CardContent className={cn('flex flex-col space-y-2', sm && 'text-xs py-2 px-2')}>
        {/* Currency selection buttons */}
        <div className="flex gap-2">
          {uniqueFromCurrencies.map((cur) => (
            <Button
              key={cur}
              size="sm"
              variant={cur === selectedFrom ? 'secondary' : 'outline'}
              onClick={() => setSelectedFrom(cur)}
              type="button"
              className={cn(sm && 'text-xs')}
            >
              {cur}
            </Button>
          ))}
        </div>

        {/* Filtered rates display */}
        <div className="mt-2">
          {filteredRates.length === 0 ? (
            <p>No rates for {selectedFrom}</p>
          ) : (
            filteredRates.map((rate) => (
              <p key={`${rate.fromCurrency}-${rate.toCurrency}`}>
                {rate.fromCurrency} → {rate.toCurrency}: {roundNumber(rate.rate)}
              </p>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
