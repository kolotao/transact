'use client'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

/**
 * Use throughout your app instead of plain `useDispatch`.
 * It automatically provides the correct type.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * Use throughout your app instead of plain `useSelector`.
 * It automatically provides the correct type for state.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
