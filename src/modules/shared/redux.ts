import type { extraArgument } from '@/app/extra-argument'
import type { store } from '@/app/store'
import { type ThunkAction, type UnknownAction, createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()
