export type StatsPeriod = 'today' | 'week' | 'month' | 'custom'

export interface StatsFilters {
  period?: StatsPeriod
  startDate?: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD
}

export interface ApiStatsSummary {
  totalReviewed: number
  totalReviewedToday: number
  totalReviewedThisWeek: number
  totalReviewedThisMonth: number
  approvedPercentage: number
  rejectedPercentage: number
  requestChangesPercentage: number
  averageReviewTime: number
}

export interface ApiActivityData {
  date: string // YYYY-MM-DD
  approved: number
  rejected: number
  requestChanges: number
}

export interface ApiDecisionsData {
  approved: number
  rejected: number
  requestChanges: number
}

export interface ApiCategoriesData {
  [category: string]: number
}

export interface ApiModerator {
  id: number
  name: string
  email: string
  role: string
  statistics: ApiModeratorStats
  permissions: string[]
}

export interface ApiModeratorStats {
  totalReviewed: number
  todayReviewed: number
  thisWeekReviewed: number
  thisMonthReviewed: number
  averageReviewTime: number
  approvalRate: number
}
