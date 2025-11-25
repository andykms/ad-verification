import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AdsState, Advertisement } from '../../types/app/ads'
import {
  fetchAds,
  fetchAdById,
  approveAd,
  rejectAd,
  requestChangesAd,
  bulkApproveAds,
  bulkRejectAds,
  fetchCategories,
  fetchPossibleMaxPrice,
  fetchPossibleMinPrice,
} from './ads.thunk'

const initialState: AdsState = {
  ads: [],
  pagination: null,
  currentAd: null,
  currAdPage: null,
  loading: false,
  error: null,
  errorGetById: null,
  selectedAds: [],
  bulkOperationLoading: false,
  categories: [],
  totalItems: 0,
  totalPages: 0,
  possibleMaxPrice: 2 ** 24,
  possibleMinPrice: 0,
}

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    addSelected: (state, action: PayloadAction<number>) => {
      if (!state.selectedAds.includes(action.payload)) {
        state.selectedAds.push(action.payload)
      }
    },
    removeSelected: (state, action: PayloadAction<number>) => {
      state.selectedAds = state.selectedAds.filter(
        (id) => id !== action.payload
      )
    },

    setCurrAd: (state, action: PayloadAction<Advertisement>) => {
      state.currentAd = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPossibleMaxPrice.fulfilled, (state, action) => {
        state.possibleMaxPrice = action.payload
      })
      .addCase(fetchPossibleMinPrice.fulfilled, (state, action) => {
        state.possibleMinPrice = action.payload
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        ;((state.categories = action.payload),
          (state.error = null),
          (state.loading = false))
      })
      .addCase(fetchAds.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false
        state.ads = action.payload.ads
        state.pagination = action.payload.pagination
        state.totalItems = action.payload.pagination.totalItems
        state.totalPages = action.payload.pagination.totalPages
      })
      .addCase(fetchAds.rejected, (state) => {
        state.loading = false
        state.error = 'Ошибка при загрузке объявлений'
        state.ads = []
        state.pagination = null
      })
      .addCase(fetchAdById.pending, (state) => {
        state.loading = true
        state.errorGetById = null
        state.currentAd = null
      })
      .addCase(fetchAdById.fulfilled, (state, action) => {
        state.loading = false
        state.currentAd = action.payload
        state.errorGetById = null
      })
      .addCase(fetchAdById.rejected, (state) => {
        state.loading = false
        state.errorGetById = 'Ошибка при загрузке объявления'
        state.currentAd = null
      })
      .addCase(approveAd.fulfilled, (state, action) => {
        state.currentAd = action.payload
        if (state.ads) {
          state.ads = state.ads.map((ad) => {
            if (ad.id === action.payload.id) {
              return action.payload
            }
            return ad
          })
        }
        state.bulkOperationLoading = false
        state.error = null
        state.loading = false
      })
      .addCase(approveAd.rejected, (state) => {
        ;((state.error = 'Ошибка при подтверждении объявления'),
          (state.bulkOperationLoading = false),
          (state.loading = false))
      })
      .addCase(approveAd.pending, (state) => {
        state.bulkOperationLoading = true
        state.error = null
        state.loading = false
      })
      .addCase(rejectAd.fulfilled, (state, action) => {
        state.currentAd = action.payload
        if (state.ads) {
          state.ads = state.ads.map((ad) => {
            if (ad.id === action.payload.id) {
              return action.payload
            }
            return ad
          })
        }
        state.error = null
        state.loading = false
      })
      .addCase(rejectAd.rejected, (state) => {
        state.error = 'Ошибка при отклонении объявления'
        state.bulkOperationLoading = false
        state.loading = false
      })
      .addCase(requestChangesAd.fulfilled, (state, action) => {
        if (state.currentAd?.id === action.payload.id) {
          state.currentAd.status = action.payload.status
        }
        if (state.ads) {
          state.ads = state.ads.map((ad) => {
            if (ad.id === action.payload.id) {
              return { ...ad, status: action.payload.status }
            }
            return ad
          })
        }
        state.selectedAds = state.selectedAds.filter(
          (id) => id !== action.payload.id
        )
        state.bulkOperationLoading = false
        state.error = null
        state.loading = false
      })
      .addCase(requestChangesAd.rejected, (state) => {
        state.error = 'Ошибка при запросе изменений'
        state.bulkOperationLoading = false
        state.loading = false
      })
      .addCase(bulkApproveAds.fulfilled, (state, action) => {
        if (state.ads) {
          const changedAds = action.payload.map(({ ad }) => ad.id)
          const changedAdsSet = new Set(changedAds)
          state.ads = state.ads.map((ad) => {
            if (changedAdsSet.has(ad.id)) {
              return { ...ad, status: 'approved' }
            } else {
              return ad
            }
          })
        }
        state.selectedAds = []
        state.bulkOperationLoading = false
        state.error = null
        state.loading = false
      })
      .addCase(bulkApproveAds.rejected, (state) => {
        state.error = 'Ошибка при подтверждении объявлений'
        state.bulkOperationLoading = false
        state.loading = false
      })
      .addCase(bulkRejectAds.fulfilled, (state, action) => {
        if (state.ads) {
          const changedAds = action.payload.map(({ ad }) => ad.id)
          const changedAdsSet = new Set(changedAds)
          state.ads = state.ads.map((ad) => {
            if (changedAdsSet.has(ad.id)) {
              return { ...ad, status: 'rejected' }
            } else {
              return ad
            }
          })
        }

        state.selectedAds = []
        state.bulkOperationLoading = false
        state.error = null
        state.loading = false
      })
      .addCase(bulkRejectAds.rejected, (state) => {
        state.error = 'Ошибка при отклонении объявлений'
        state.bulkOperationLoading = false
        state.loading = false
      })
  },
  selectors: {
    getAds: (state) => {
      return state.ads
    },
    getSelectedAds: (state) => {
      return state.selectedAds
    },
    getLoading: (state) => {
      return state.loading
    },
    getBulkOperationLoading: (state) => {
      return state.bulkOperationLoading
    },
    getCurrAd: (state) => {
      return state.currentAd
    },
    getCategories: (state) => {
      return state.categories
    },
    getTotalItems: (state) => {
      return state.totalItems
    },
    getTotalPages: (state) => {
      return state.totalPages
    },
    getPossibleMinPrice: (state) => {
      return state.possibleMinPrice
    },
    getPossibleMaxPrice: (state) => {
      return state.possibleMaxPrice
    },

    getNextAd: (state): number | null => {
      const currentAd = state.currentAd
      if (!currentAd) {
        return null
      }
      const currIndex = state.ads.findIndex((ad) => ad.id === currentAd.id)
      const nextIndex = currIndex + 1
      if (nextIndex >= state.ads.length) {
        return -1
      }
      return state.ads[nextIndex].id
    },

    getPrevAd: (state): number | null => {
      const currentAd = state.currentAd
      if (!currentAd) {
        return null
      }
      const currIndex = state.ads.findIndex((ad) => ad.id === currentAd.id)
      const prevIndex = currIndex - 1
      if (prevIndex < 0) {
        return -1
      }
      return state.ads[prevIndex].id
    },

    getFirstAd: (state): number | null => {
      if (state.ads.length === 0) {
        return null
      }
      return state.ads[0].id
    },
    getLastAd: (state): number | null => {
      if (state.ads.length === 0) {
        return null
      }
      return state.ads[state.ads.length - 1].id
    },
    getError: (state): string | null => {
      return state.errorGetById
    },
  },
})

export const {
  getAds,
  getSelectedAds,
  getLoading,
  getBulkOperationLoading,
  getCurrAd,
  getCategories,
  getTotalItems,
  getTotalPages,
  getPossibleMaxPrice,
  getPossibleMinPrice,
  getNextAd,
  getPrevAd,
  getFirstAd,
  getLastAd,
  getError,
} = adsSlice.selectors

export const { addSelected, removeSelected, setCurrAd } = adsSlice.actions
