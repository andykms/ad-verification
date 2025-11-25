import { configureStore, combineSlices } from '@reduxjs/toolkit'
import { adsSlice } from '../features/ads/ads.slice'
import { filterSlice } from '../features/adsFilter/adsFilter.slice'
import { statsSlice } from '../features/stats/stats.slice'
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'

const rootReducer = combineSlices(adsSlice, filterSlice, statsSlice)

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
