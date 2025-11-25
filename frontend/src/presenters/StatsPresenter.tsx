import { useEffect } from 'react'

import { StatsPage } from '../pages/StatsPage/StatsPage'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchAllStats } from '../features/stats/stats.thunk'
import {
  getSummary,
  getActivity,
  getDecisions,
  getCategories,
  getModerator,
  getFilters,
  setFilters,
} from '../features/stats/stats.slice'
import { converterDate } from '../utils/converterDate'
import type { StatsPeriod } from '../types/api/stats'

export const StatsPresenter = () => {
  const dispatch = useAppDispatch()

  const filters = useAppSelector(getFilters)

  useEffect(() => {
    dispatch(fetchAllStats(filters))
  }, [dispatch, filters])

  const summary = useAppSelector(getSummary)
  const activity = useAppSelector(getActivity)
  const decisions = useAppSelector(getDecisions)
  const categories = useAppSelector(getCategories)
  const moderator = useAppSelector(getModerator)

  const handleChangePeriod = (
    period: StatsPeriod,
    startDate?: Date,
    endDate?: Date
  ) => {
    dispatch(
      setFilters({
        period,
        startDate: startDate?.toISOString().slice(0, 10),
        endDate: endDate?.toISOString().slice(0, 10),
      })
    )
  }

  return (
    <StatsPage
      summary={summary}
      decisions={decisions}
      activity={activity.map((activity) => ({
        ...activity,
        date: converterDate(activity.date),
      }))}
      categories={categories}
      moderator={moderator}
      onChangePeriod={handleChangePeriod}
      choosenPeriod={{
        startDate: null,
        endDate: null,
      }}
      choosenOption={filters.period || 'week'}
    />
  )
}
