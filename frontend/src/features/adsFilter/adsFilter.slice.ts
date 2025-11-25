import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type TSort =
  | 'old'
  | 'new'
  | 'minprice'
  | 'maxprice'
  | 'maxpriority'
  | 'minpriority'

export type TSortType = TSort | null

export const validSortTypes: string[] = [
  'old',
  'new',
  'minprice',
  'maxprice',
  'maxpriority',
  'minpriority',
]

function isTSortType(value: string | null): value is TSortType {
  return value === null || validSortTypes.includes(value)
}

export interface FilterState {
  statuses: string[]
  category: number | null
  minPrice: number
  maxPrice: number
  search: string
  sortBy: TSortType
  page: number
}

const globalMaxPrice = 2 ** 20

// Helper functions for URL query management
const getQueryParams = () => {
  if (typeof window === 'undefined') return {}

  const urlParams = new URLSearchParams(window.location.search)
  const params: Record<string, string> = {}

  for (const [key, value] of urlParams.entries()) {
    params[key] = value
  }

  return params
}

const updateQueryParams = (state: FilterState) => {
  if (typeof window === 'undefined') return

  const urlParams = new URLSearchParams()

  // Add statuses if not empty
  if (state.statuses.length > 0) {
    urlParams.append('status', state.statuses.join('&'))
  }

  // Add categories if not empty
  if (state.category) {
    urlParams.set('category', state.category.toString())
  }

  // Add prices if not default
  if (state.minPrice !== 0) {
    urlParams.set('minPrice', state.minPrice.toString())
  }

  if (state.maxPrice !== globalMaxPrice) {
    // Assuming 100000 is default max
    urlParams.set('maxPrice', state.maxPrice.toString())
  }

  // Add search if not empty
  if (state.search) {
    urlParams.set('search', state.search)
  }

  if (state.sortBy) {
    urlParams.set('sortby', state.sortBy)
  }

  if (state.page) {
    urlParams.set('page', state.page.toString())
  }

  const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`
  window.history.replaceState(null, '', newUrl)
}

const getInitialState = (): FilterState => {
  const params = getQueryParams()
  return {
    statuses: params.status ? params.status.split('&') : [],
    category: params.category ? parseInt(params.category, 10) : null,
    minPrice: params.minPrice ? parseInt(params.minPrice, 10) : 0,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : globalMaxPrice,
    search: params.search || '',
    sortBy: isTSortType(params.sortby) ? params.sortby : null,
    page: params.page ? parseInt(params.page, 10) : 1,
  }
}

const initialState: FilterState = getInitialState()

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addStatus: (state, action: PayloadAction<string>) => {
      if (!state.statuses.includes(action.payload)) {
        state.statuses.push(action.payload)
        updateQueryParams(state)
      }
    },
    removeStatus: (state, action: PayloadAction<string>) => {
      state.statuses = state.statuses.filter(
        (status) => status !== action.payload
      )
      updateQueryParams(state)
    },
    setStatuses: (state, action: PayloadAction<string[]>) => {
      state.statuses = action.payload
      updateQueryParams(state)
    },
    clearStatuses: (state) => {
      state.statuses = []
      updateQueryParams(state)
    },

    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload
      updateQueryParams(state)
    },
    removeCategory: (state) => {
      state.category = null
      updateQueryParams(state)
    },

    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload
      updateQueryParams(state)
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload
      updateQueryParams(state)
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.minPrice = action.payload.min
      state.maxPrice = action.payload.max
      updateQueryParams(state)
    },
    clearPrices: (state) => {
      state.minPrice = 0
      state.maxPrice = globalMaxPrice
      updateQueryParams(state)
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
      updateQueryParams(state)
    },
    clearSearch: (state) => {
      state.search = ''
      updateQueryParams(state)
    },

    clearAllFilters: (state) => {
      state.statuses = []
      state.category = null
      state.minPrice = 0
      state.maxPrice = globalMaxPrice
      state.search = ''
      state.sortBy = null
      updateQueryParams(state)
    },

    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      Object.assign(state, action.payload)
      updateQueryParams(state)
    },

    setSortBy: (state, action: PayloadAction<string>) => {
      const newSortType = action.payload
      if (!isTSortType(newSortType)) {
        state.sortBy = null
        return
      }
      state.sortBy = newSortType
      if (newSortType) {
        updateQueryParams(state)
      }
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
      updateQueryParams(state)
    },
  },
  selectors: {
    selectStatuses: (state) => state.statuses,
    selectCategories: (state) => state.category,
    selectMinPrice: (state) => state.minPrice,
    selectMaxPrice: (state) => state.maxPrice,
    selectSearch: (state) => state.search,
    selectSortBy: (state) => state.sortBy,
    selectPage: (state) => state.page,
  },
})

export const {
  addStatus,
  removeStatus,
  setStatuses,
  clearStatuses,
  setCategory,
  removeCategory,
  setMinPrice,
  setMaxPrice,
  setPriceRange,
  clearPrices,
  setSearch,
  clearSearch,
  clearAllFilters,
  setFilters,
  setSortBy,
  setPage,
} = filterSlice.actions

export const {
  selectStatuses,
  selectCategories,
  selectMinPrice,
  selectMaxPrice,
  selectSearch,
  selectSortBy,
  selectPage,
} = filterSlice.selectors
