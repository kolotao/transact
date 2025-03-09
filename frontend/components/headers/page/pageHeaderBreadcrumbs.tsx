'use client'

import React, { FC } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { useTranslation } from '@/app/i18n/client'

interface HeaderBreadcrumbsProps {
  title?: string
  contextTitle?: string
  lng: string
  isBreadcrumb?: boolean
}

/**
 * PageHeader component with breadcrumbs.
 *
 * This version relies on the `useBreadcrumbs` hook to parse
 * the current route and generate segments. If no segments 
 * exist, we fallback to a single crumb.
 *
 * The `title` can override the last crumb's label if you wish.
 */
export const PageHeaderBreadcrumbs: FC<HeaderBreadcrumbsProps> = ({ title, lng, isBreadcrumb = true }) => {
  const { t } = useTranslation(lng, 'translation')
  const breadcrumbs = useBreadcrumbs()

  // If you want to map the last crumb to `title` or something
  const lastCrumbLabel = title ?? ''

  if (breadcrumbs.length === 0 || isBreadcrumb === false) { 
    // Fallback: single breadcrumb with just the 'pageTitle'
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{t(lastCrumbLabel)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          let label = isLast && lastCrumbLabel ? lastCrumbLabel : crumb.label
          label = lastCrumbLabel && isLast ? lastCrumbLabel : `breadcrumbs.${label.toLowerCase()}`

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{t(label)}</BreadcrumbPage>
                ) : crumb.href ? (
                  <BreadcrumbLink href={crumb.href}>{t(label)}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{t(label)}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
