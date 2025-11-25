import type { StatsFilters as ApiStatsFilters } from '../api/stats'

export interface StatsFilters extends ApiStatsFilters {}

export interface StatsSummary {
  totalReviewed: number
  totalReviewedToday: number
  totalReviewedThisWeek: number
  totalReviewedThisMonth: number
  approvedPercentage: number
  rejectedPercentage: number
  requestChangesPercentage: number
  averageReviewTime: number
}

export interface ActivityData {
  date: string
  approved: number
  rejected: number
  requestChanges: number
}

export interface DecisionsData {
  approved: number
  rejected: number
  requestChanges: number
}

export interface CategoriesData {
  [category: string]: number
}

export interface Moderator {
  id: number
  name: string
  email: string
  role: string
  statistics: ModeratorStats
  permissions: string[]
}

export interface ModeratorStats {
  totalReviewed: number
  todayReviewed: number
  thisWeekReviewed: number
  thisMonthReviewed: number
  averageReviewTime: number
  approvalRate: number
}

export interface StatsState {
  summary: StatsSummary | null
  activity: ActivityData[]
  decisions: DecisionsData | null
  categories: CategoriesData
  moderator: Moderator | null
  loading: boolean
  error: string | null
  filters: StatsFilters
}
