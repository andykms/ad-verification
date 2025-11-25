import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {
  StatsState,
  StatsSummary,
  ActivityData,
  DecisionsData,
  CategoriesData,
  Moderator,
} from '../../types/app/stats'
import {
  fetchStatsSummary,
  fetchActivityData,
  fetchDecisionsData,
  fetchCategoriesData,
  fetchCurrentModerator,
  fetchAllStats,
} from './stats.thunk'
import type { StatsFilters, StatsPeriod } from '../../types/api/stats'

const getQueryParams = () => {
  if (typeof window === 'undefined') return {}

  const urlParams = new URLSearchParams(window.location.search)
  const params: Record<string, string> = {}

  for (const [key, value] of urlParams.entries()) {
    params[key] = value
  }

  return params
}

const getInitialFilter = (): {
  period: StatsPeriod
  startDate: string | undefined
  endDate: string | undefined
} => {
  const params = getQueryParams()
  console.log(params)
  const period: string = params.period || 'week'
  const startDate = params.start_date
  const endDate = params.end_date
  return {
    period: period as StatsPeriod,
    startDate,
    endDate,
  }
}

const initialState: StatsState = {
  summary: null,
  activity: [],
  decisions: null,
  categories: {},
  moderator: null,
  loading: false,
  error: null,
  filters: getInitialFilter(),
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setSummary: (state, action: PayloadAction<StatsSummary>) => {
      state.summary = action.payload
    },
    setActivity: (state, action: PayloadAction<ActivityData[]>) => {
      state.activity = action.payload
    },
    setDecisions: (state, action: PayloadAction<DecisionsData>) => {
      state.decisions = action.payload
    },
    setCategories: (state, action: PayloadAction<CategoriesData>) => {
      state.categories = action.payload
    },
    setModerator: (state, action: PayloadAction<Moderator>) => {
      state.moderator = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<StatsFilters>>) => {
      state.filters = action.payload
      const urlParams = new URLSearchParams()
      if (state.filters.period) {
        urlParams.set('period', state.filters.period)
      }
      if (state.filters.endDate) {
        urlParams.set('end_date', state.filters.endDate)
      }
      if (state.filters.startDate) {
        urlParams.set('start_date', state.filters.startDate)
      }
      const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`
      window.history.replaceState(null, '', newUrl)
    },
    clearStats: (state) => {
      state.summary = null
      state.activity = []
      state.decisions = null
      state.categories = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllStats.fulfilled, (state, action) => {
        state.loading = false
        state.summary = action.payload.summary
        state.activity = action.payload.activity
        state.decisions = action.payload.decisions
        state.categories = action.payload.categories
        state.moderator = action.payload.moderator
      })
      .addCase(fetchAllStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch statistics'
      })

    builder
      .addCase(fetchStatsSummary.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStatsSummary.fulfilled, (state, action) => {
        state.loading = false
        state.summary = action.payload
      })
      .addCase(fetchStatsSummary.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch summary'
      })
    builder
      .addCase(fetchActivityData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchActivityData.fulfilled, (state, action) => {
        state.loading = false
        state.activity = action.payload
      })
      .addCase(fetchActivityData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch activity data'
      })

    builder
      .addCase(fetchDecisionsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDecisionsData.fulfilled, (state, action) => {
        state.loading = false
        state.decisions = action.payload
      })
      .addCase(fetchDecisionsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch decisions data'
      })

    builder
      .addCase(fetchCategoriesData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch categories data'
      })

    builder
      .addCase(fetchCurrentModerator.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrentModerator.fulfilled, (state, action) => {
        state.loading = false
        state.moderator = action.payload
      })
      .addCase(fetchCurrentModerator.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch moderator data'
      })
  },
  selectors: {
    getSummary: (state) => state.summary,
    getActivity: (state) => state.activity,
    getDecisions: (state) => state.decisions,
    getCategories: (state) => state.categories,
    getModerator: (state) => state.moderator,
    getFilters: (state) => state.filters,
  },
})

export const {
  setLoading,
  setError,
  setSummary,
  setActivity,
  setDecisions,
  setCategories,
  setModerator,
  setFilters,
  clearStats,
} = statsSlice.actions

export const {
  getSummary,
  getActivity,
  getDecisions,
  getCategories,
  getModerator,
  getFilters,
} = statsSlice.selectors
