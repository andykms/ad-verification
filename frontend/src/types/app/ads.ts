import type {
  ApiAdvertisement,
  ApiPagination,
  ApiSeller,
  ApiModerationHistory,
} from '../api/ads'

export interface Advertisement extends ApiAdvertisement {}
export interface Pagination extends ApiPagination {}

export type TSortByApp = 'createdAt' | 'price' | 'priority'
export type TSortOrderApp = 'asc' | 'desc'

export type TRejectReasons =
  | 'Запрещенный товар'
  | 'Неверная категория'
  | 'Некорректное описание'
  | 'Проблемы с фото'
  | 'Подозрение на мошенничество'
  | 'Другое'

export interface Category {
  id: number
  name: string
}

export interface AdsState {
  errorGetById: string | null
  ads: Advertisement[]
  pagination: Pagination | null
  currentAd: Advertisement | null
  currAdPage: number | null
  loading: boolean
  error: string | null
  selectedAds: number[]
  bulkOperationLoading: boolean
  categories: Category[]
  totalItems: number
  totalPages: number
  possibleMinPrice: number
  possibleMaxPrice: number
}

export interface AdsFilters {
  page: number
  limit: number
  status?: string[]
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: TSortByApp
  sortOrder?: TSortOrderApp
}

export interface RejectData {
  reason: TRejectReasons
  comment?: string
}
