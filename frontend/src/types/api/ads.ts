export type ApiAdStatus =
  | 'moderation'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'draft'

export interface ApiAdvertisement {
  id: number
  title: string
  description: string
  price: number
  category: string
  categoryId: number
  status: ApiAdStatus
  priority: 'normal' | 'urgent'
  createdAt: string
  updatedAt: string
  images: string[]
  seller: ApiSeller
  characteristics: Record<string, string>
  moderationHistory: ApiModerationHistory[]
}

export interface ApiSeller {
  id: number
  name: string
  rating: string
  totalAds: number
  registeredAt: string
}

export interface ApiModerationHistory {
  id: number
  moderatorId: number
  moderatorName: string
  action: ApiAdStatus
  reason: string | null
  comment: string
  timestamp: string
}

export interface ApiPagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface ApiAdsResponse {
  ads: ApiAdvertisement[]
  pagination: ApiPagination
}

export interface ApiRejectRequest {
  reason:
    | 'Запрещенный товар'
    | 'Неверная категория'
    | 'Некорректное описание'
    | 'Проблемы с фото'
    | 'Подозрение на мошенничество'
    | 'Другое'
  comment?: string
}

export interface ApiAdsFilters {
  page?: number
  limit?: number
  status?: string[]
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: 'createdAt' | 'price' | 'priority'
  sortOrder?: 'asc' | 'desc'
}
