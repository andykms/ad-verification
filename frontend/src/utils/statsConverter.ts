import type {
  ApiStatsSummary,
  ApiActivityData,
  ApiDecisionsData,
  ApiCategoriesData,
  ApiModerator,
} from '../types/api/stats'
import type {
  StatsSummary,
  ActivityData,
  DecisionsData,
  CategoriesData,
  Moderator,
} from '../types/app/stats'

export const convertApiStatsSummaryToApp = (
  apiSummary: ApiStatsSummary
): StatsSummary => ({
  ...apiSummary,
})

export const convertApiDecisionsDataToApp = (
  apiDecisions: ApiDecisionsData
): DecisionsData => ({
  ...apiDecisions,
})

export const convertApiCategoriesDataToApp = (
  apiCategories: ApiCategoriesData
): CategoriesData => ({
  ...apiCategories,
})

export const convertApiModeratorToApp = (
  apiModerator: ApiModerator
): Moderator => ({
  ...apiModerator,
  statistics: {
    ...apiModerator.statistics,
  },
})
