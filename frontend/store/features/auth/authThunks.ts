import { createAsyncThunk } from '@reduxjs/toolkit'
import { parseError } from '@/store/utils/parseError'
import { config } from '@/lib/config.client'
import type { LoginPayload, RegisterPayload } from './types'
import { User } from '../users/types'

const BASE_URL = `${config.apiBaseUrl}`

/**
 * Register a new user, automatically logs them in upon success.
 * POST /api/register
 */
export const registerUser = createAsyncThunk<User, RegisterPayload>(
  'auth/registerUser',
  async (payload) => {
    const url = `${BASE_URL}/register`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(await parseError(response))

    const data = await response.json() as { user: User }
    return data.user
  }
)

/**
 * Log in existing user with email + password.
 * POST /api/login
 */
export const loginUser = createAsyncThunk<User, LoginPayload>(
  'auth/loginUser',
  async ({ email, password }) => {
    const url = `${BASE_URL}/login`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error(await parseError(response))}

    const data = await response.json() as { user: User }
    return data.user
  }
)

/**
 * Log out the current user (unsets the session).
 * DELETE /api/logout
 */
export const logoutUser = createAsyncThunk<void>(
  'auth/logoutUser',
  async () => {
    const url = `${BASE_URL}/logout`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!response.ok) throw new Error(await parseError(response))

    // The endpoint returns null on success, so we do nothing 
  }
)

/**
 * Fetch the current authenticated user.
 * GET /api/me
 * Returns { user }
 */
export const fetchCurrentUser = createAsyncThunk<User, void>(
  'auth/fetchCurrentUser',
  async () => {
    const url = `${BASE_URL}/me`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok) throw new Error(await parseError(response))

    const data = await response.json() as { user: User }
    return data.user
  }
)
