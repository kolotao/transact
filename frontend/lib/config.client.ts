/**
 * Global application config (env vars).
 * Client-side version.
 * 
 * This module centralizes all environment-based variables
 * that are used in the application.
 */

export const config = {
    /**
     * Base URL for the API calls. 
     */
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5438/api',
    nodeENV: process.env.NODE_ENV || 'development',
  }
  