import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

/**
 * A breadcrumb segment object.
 * @property label The display text for this segment
 * @property href The URL to link to (omitted for the last segment, or if it's just text)
 * @property params Optional route params or other data
 */
export interface BreadcrumbSegment {
  label: string
  href?: string
  params?: Record<string, string>
}

/**
 * useBreadcrumbs hook for Next.js App Router.
 * 
 * Parses the current pathname from `usePathname` and returns
 * an array of breadcrumb segments.
 * 
 * Example:
 *  - pathname: "/en/dashboard/accounts/123/edit"
 *  => segments for:
 *     [
 *       { label: "dashboard", href: "/en/dashboard" },
 *       { label: "accounts",  href: "/en/dashboard/accounts" },
 *       { label: "123",       href: "/en/dashboard/accounts/123" },
 *       { label: "edit",      // last segment, no href }
 *     ]
 * 
 */
export function useBreadcrumbs(): BreadcrumbSegment[] {
  const pathname = usePathname() // e.g. "/en/dashboard/accounts/123/edit"

  return useMemo(() => {
    if (!pathname) return []

    // Split on "/", filter out empty segments
    const rawSegments = pathname.split('/').filter(Boolean)
    // e.g. ["en", "dashboard", "accounts", "123", "edit"]

    // If your first segment is "en" or some other locale, you might want to skip it
    // Let's skip the locale in the breadcrumb
    const segmentsWithoutLocale = rawSegments.slice(1)
    // e.g. ["dashboard", "accounts", "123", "edit"]

    // We'll build up the cumulative path as we go
    let pathSoFar = '/' + rawSegments[0] // keep "/en" in the base
    // e.g. "/en"

    const crumbList: BreadcrumbSegment[] = segmentsWithoutLocale.map((segment, idx) => {
      pathSoFar += '/' + segment
      // for example, "/en/dashboard", then "/en/dashboard/accounts", etc.

      return {
        label: segment,
        // The last segment typically doesn't get an href, 
        // so it becomes the "current" crumb
        href: idx < segmentsWithoutLocale.length - 1 ? pathSoFar : undefined,
      }
    })

    return crumbList
  }, [pathname])
}
