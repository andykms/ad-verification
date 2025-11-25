import { NavLink } from 'react-router-dom'
import style from './MainPage.module.css'
import { InfoCard } from '../../components/ui/InfoCard/InfoCard'
import { StatisticButton } from '../../components/widgets/StatisticButton/StatisticButton'
import { SettingsButton } from '../../components/ui/SettingsButton/SettingsButton'
import { Loader } from '../../components/ui/Loader/Loader'
import { ListButton } from '../../components/ui/ListButton/ListButton'

export interface MainPageModerator {
  id: number
  name: string
  role: string
  statistics: StatsPageModeratorStats
  permissions: string[]
}

export interface StatsPageModeratorStats {
  totalReviewed: number
  todayReviewed: number
  thisWeekReviewed: number
  thisMonthReviewed: number
  averageReviewTime: number
  approvalRate: number
}

export interface MainPageProps {
  moderator: MainPageModerator | null
}

export const MainPage = (props: MainPageProps) => {
  const { moderator } = props

  if (!moderator) {
    return <Loader></Loader>
  }

  const getTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainSeconds = seconds - minutes * 60
    if (minutes >= 1) {
      return (
        `${minutes} мин.` + (remainSeconds > 0 ? ` ${remainSeconds} сек.` : '')
      )
    }
    return `${seconds} сек.`
  }

  return (
    <main className={style.main}>
      <nav className={style.nav}>
        <NavLink to="/list">
          <ListButton></ListButton>
        </NavLink>
        <NavLink to="/stats">
          <StatisticButton></StatisticButton>
        </NavLink>
        <NavLink to="/settings">
          <SettingsButton></SettingsButton>
        </NavLink>
      </nav>
      <div className={style.welcome}>
        <h1
          className={style.welcomeTitle}
        >{`Добро пожаловать, ${moderator.name}!`}</h1>
      </div>
      <div className={style.moderatorInfo}>
        <span
          className={style.rolesTitle}
        >{`Уровень доступа: ${moderator.role}`}</span>
        <div className={style.infoCards}>
          <InfoCard
            title="Всего проверено"
            value={moderator.statistics.totalReviewed}
          ></InfoCard>
          <InfoCard
            title="Сегодня проверено"
            value={moderator.statistics.todayReviewed}
          ></InfoCard>
          <InfoCard
            title="За неделю проверено"
            value={moderator.statistics.thisWeekReviewed}
          ></InfoCard>
          <InfoCard
            title="За месяц проверено"
            value={moderator.statistics.thisMonthReviewed}
          ></InfoCard>
          <InfoCard
            title="Среднее время проверки"
            value={getTime(moderator.statistics.averageReviewTime)}
          ></InfoCard>
          <InfoCard
            title="Рейтинг"
            value={moderator.statistics.approvalRate}
          ></InfoCard>
        </div>
      </div>
    </main>
  )
}
