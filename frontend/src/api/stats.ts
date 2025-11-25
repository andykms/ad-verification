import type {
  ApiStatsSummary,
  ApiActivityData,
  ApiDecisionsData,
  ApiCategoriesData,
  ApiModerator,
  StatsFilters,
} from '../types/api/stats'
import { API_BASE_URL } from '../utils/constants'

class StatsApi {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async getSummary(filters: StatsFilters = {}): Promise<ApiStatsSummary> {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString())
      }
    })

    const queryString = queryParams.toString()
    const endpoint = queryString
      ? `/stats/summary?${queryString}`
      : '/stats/summary'

    return this.request<ApiStatsSummary>(endpoint)
  }

  async getActivity(filters: StatsFilters = {}): Promise<ApiActivityData[]> {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString())
      }
    })

    const queryString = queryParams.toString()
    const endpoint = queryString
      ? `/stats/chart/activity?${queryString}`
      : '/stats/chart/activity'

    return this.request<ApiActivityData[]>(endpoint)
  }

  async getDecisions(filters: StatsFilters = {}): Promise<ApiDecisionsData> {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString())
      }
    })

    const queryString = queryParams.toString()
    const endpoint = queryString
      ? `/stats/chart/decisions?${queryString}`
      : '/stats/chart/decisions'

    return this.request<ApiDecisionsData>(endpoint)
  }

  async getCategories(filters: StatsFilters = {}): Promise<ApiCategoriesData> {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString())
      }
    })

    const queryString = queryParams.toString()
    const endpoint = queryString
      ? `/stats/chart/categories?${queryString}`
      : '/stats/chart/categories'

    return this.request<ApiCategoriesData>(endpoint)
  }

  async getCurrentModerator(): Promise<ApiModerator> {
    return this.request<ApiModerator>('/moderators/me')
  }
}

export const statsApi = new StatsApi()
