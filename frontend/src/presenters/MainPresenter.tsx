import { useEffect } from 'react'
import { MainPage } from '../pages/MainPage/MainPage'
import { fetchCurrentModerator } from '../features/stats/stats.thunk'
import { getModerator } from '../features/stats/stats.slice'
import { useAppDispatch, useAppSelector } from '../store'

export const MainPresenter = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCurrentModerator())
  }, [dispatch])

  const moderator = useAppSelector(getModerator)

  return <MainPage moderator={moderator}></MainPage>
}
