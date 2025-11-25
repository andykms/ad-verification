import { useEffect } from 'react'
import type { TSortByApp, TSortOrderApp } from '../types/app/ads'
import {
  selectPage,
  selectStatuses,
  selectCategories,
  selectMaxPrice,
  selectMinPrice,
  selectSearch,
  selectSortBy,
  type TSortType,
} from '../features/adsFilter/adsFilter.slice'
import { useAppSelector } from '../store'
import { getAds } from '../features/ads/ads.slice'
import { useAppDispatch } from '../store'
import { fetchAds } from '../features/ads/ads.thunk'

export type TFilters = {
  page: number
  statuses: string[]
  categories: number | null
  minPrice: number
  maxPrice: number
  search: string
  sortBy: TSortType
}

export const useFilters = () => {
  const pageFilters = useAppSelector(selectPage)
  const statusesFilters = useAppSelector(selectStatuses)
  const categoriesFilters = useAppSelector(selectCategories)
  const maxPriceFilters = useAppSelector(selectMaxPrice)
  const minPriceFilter = useAppSelector(selectMinPrice)
  const searchFilters = useAppSelector(selectSearch)
  const sortByFilters = useAppSelector(selectSortBy)

  const ads = useAppSelector(getAds)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let sortByApi: TSortByApp | undefined
    let sortOrderApi: TSortOrderApp | undefined
    if (sortByFilters === 'maxprice') {
      sortByApi = 'price'
      sortOrderApi = 'asc'
    } else if (sortByFilters === 'minprice') {
      sortByApi = 'price'
      sortOrderApi = 'desc'
    } else if (sortByFilters === 'maxpriority') {
      sortByApi = 'priority'
      sortOrderApi = 'desc'
    } else if (sortByFilters === 'minpriority') {
      sortByApi = 'priority'
      sortOrderApi = 'asc'
    } else if (sortByFilters === 'new') {
      sortByApi = 'createdAt'
      sortOrderApi = 'desc'
    } else if (sortByFilters === 'old') {
      sortByApi = 'createdAt'
      sortOrderApi = 'asc'
    }

    dispatch(
      fetchAds({
        page: pageFilters,
        limit: 10,
        status: statusesFilters,
        categoryId: categoriesFilters || undefined,
        minPrice: minPriceFilter,
        maxPrice: maxPriceFilters,
        search: searchFilters,
        sortBy: sortByApi,
        sortOrder: sortOrderApi,
      })
    )
  }, [
    dispatch,
    pageFilters,
    statusesFilters,
    categoriesFilters,
    minPriceFilter,
    maxPriceFilters,
    searchFilters,
    sortByFilters,
  ])

  const filters: TFilters = {
    page: pageFilters,
    statuses: statusesFilters,
    categories: categoriesFilters,
    minPrice: minPriceFilter,
    maxPrice: maxPriceFilters,
    search: searchFilters,
    sortBy: sortByFilters,
  }

  return { ads, filters }
}
