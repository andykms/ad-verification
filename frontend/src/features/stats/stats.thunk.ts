import { createAsyncThunk } from '@reduxjs/toolkit'
import { statsApi } from '../../api/stats'
import type { StatsFilters } from '../../types/api/stats'
import {
  convertApiStatsSummaryToApp,
  convertApiDecisionsDataToApp,
  convertApiCategoriesDataToApp,
  convertApiModeratorToApp,
} from '../../utils/statsConverter'

export const fetchStatsSummary = createAsyncThunk(
  'stats/fetchSummary',
  async (filters: StatsFilters = {}) => {
    const response = await statsApi.getSummary(filters)
    return convertApiStatsSummaryToApp(response)
  }
)

export const fetchActivityData = createAsyncThunk(
  'stats/fetchActivity',
  async (filters: StatsFilters = {}) => {
    const response = await statsApi.getActivity(filters)
    return response
  }
)

export const fetchDecisionsData = createAsyncThunk(
  'stats/fetchDecisions',
  async (filters: StatsFilters = {}) => {
    const response = await statsApi.getDecisions(filters)
    return convertApiDecisionsDataToApp(response)
  }
)

export const fetchCategoriesData = createAsyncThunk(
  'stats/fetchCategories',
  async (filters: StatsFilters = {}) => {
    const response = await statsApi.getCategories(filters)
    return convertApiCategoriesDataToApp(response)
  }
)

export const fetchCurrentModerator = createAsyncThunk(
  'stats/fetchModerator',
  async () => {
    const response = await statsApi.getCurrentModerator()
    return convertApiModeratorToApp(response)
  }
)

export const fetchAllStats = createAsyncThunk(
  'stats/fetchAll',
  async (filters: StatsFilters = {}) => {
    const [summary, activity, decisions, categories, moderator] =
      await Promise.all([
        statsApi.getSummary(filters),
        statsApi.getActivity(filters),
        statsApi.getDecisions(filters),
        statsApi.getCategories(filters),
        statsApi.getCurrentModerator(),
      ])

    return {
      summary: convertApiStatsSummaryToApp(summary),
      activity,
      decisions: convertApiDecisionsDataToApp(decisions),
      categories: convertApiCategoriesDataToApp(categories),
      moderator: convertApiModeratorToApp(moderator),
    }
  }
)
