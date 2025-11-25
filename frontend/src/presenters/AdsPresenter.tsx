import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../store'
import { ListPage } from '../pages/ListPage/ListPage'
import {
  fetchPossibleMaxPrice,
  fetchPossibleMinPrice,
} from '../features/ads/ads.thunk'
import { useFilters } from '../hooks/useFilters.hook'
import {
  setPage,
  setStatuses,
  setCategory,
  setMaxPrice,
  setMinPrice,
  setSearch,
  setSortBy,
  removeCategory,
  type TSort,
  clearAllFilters,
} from '../features/adsFilter/adsFilter.slice'
import {
  getTotalItems,
  getTotalPages,
  getCategories,
  getPossibleMaxPrice,
  getPossibleMinPrice,
} from '../features/ads/ads.slice'
import type { ApiAdStatus } from '../types/api/ads'
import { useNavigate } from 'react-router-dom'
import {
  fetchCategories,
  bulkApproveAds,
  bulkRejectAds,
} from '../features/ads/ads.thunk'
import { type TRejectReasons } from '../types/app/ads'
import { useLocation } from 'react-router-dom'

export const sortTypesTitles: { title: string; key: TSort }[] = [
  { title: 'по возрастанию цены', key: 'maxprice' },
  { title: 'по убыванию цены', key: 'minprice' },
  { title: 'по возрастанию приоритета', key: 'maxpriority' },
  { title: 'по убыванию приоритета', key: 'minpriority' },
  { title: 'по новым', key: 'new' },
  { title: 'по старым', key: 'old' },
]

export const statusTitles: { title: string; key: ApiAdStatus }[] = [
  { title: 'одобрено', key: 'approved' },
  { title: 'черновик', key: 'draft' },
  { title: 'в рассмотрении', key: 'pending' },
  { title: 'отклонено', key: 'rejected' },
]

export const AdsPresenter = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const dispatch = useAppDispatch()

  const categories = useAppSelector(getCategories)

  const minPossiblePrice = useAppSelector(getPossibleMinPrice)
  const maxPossiblePrice = useAppSelector(getPossibleMaxPrice)

  const totalItems = useAppSelector(getTotalItems)
  const totalPages = useAppSelector(getTotalPages)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchPossibleMaxPrice())
    dispatch(fetchPossibleMinPrice())
    return () => {}
  }, [])

  const { ads, filters } = useFilters()

  const handleSetStatus = (status: string[]) => {
    dispatch(setStatuses(status))
  }

  const handleSetCategory = (id: number | null) => {
    if (id) dispatch(setCategory(id))
    else dispatch(removeCategory())
  }

  const handleSetCostRange = (min: number | null, max: number | null) => {
    if (min) dispatch(setMinPrice(min))
    if (max) dispatch(setMaxPrice(max))
  }

  const handleSetSearch = (search: string) => {
    dispatch(setSearch(search))
  }

  const handleSetSortBy = (sortBy: string | null) => {
    if (sortBy) dispatch(setSortBy(sortBy))
    else dispatch(setSortBy(''))
  }

  const handlePageChange = (page: number) => {
    dispatch(setPage(page))
  }

  const handleBulkApprove = (ids: number[]) => {
    dispatch(bulkApproveAds(ids))
  }

  const handleBulkReject = (ids: number[], reason: string, comment: string) => {
    dispatch(
      bulkRejectAds({
        adIds: ids,
        data: {
          comment,
          reason: reason as TRejectReasons,
        },
      })
    )
  }

  const handleReset = () => {
    dispatch(clearAllFilters())
  }

  return (
    <ListPage
      onSetStatus={handleSetStatus}
      onSetCategory={handleSetCategory}
      onSetCostRange={handleSetCostRange}
      onSetSearch={handleSetSearch}
      onSetSortBy={handleSetSortBy}
      sortByOptions={sortTypesTitles}
      initialSortBy={filters.sortBy}
      categories={categories}
      initialCategory={filters.categories || null}
      statuses={statusTitles}
      selectedStatuses={filters.statuses || null}
      minPossiblePrice={minPossiblePrice}
      maxPossiblePrice={maxPossiblePrice}
      minPrice={filters.minPrice || null}
      maxPrice={filters.maxPrice || null}
      products={ads.map((ad) => ({
        ...ad,
        onOpen: () => {
          navigate(`/item/${ad.id}`, {
            state: { search: location.search, page: filters.page },
          })
        },
      }))}
      currentPage={filters.page}
      totalPages={totalPages}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      onBulkApprove={handleBulkApprove}
      onBulkReject={handleBulkReject}
      onSetReset={handleReset}
    />
  )
}
