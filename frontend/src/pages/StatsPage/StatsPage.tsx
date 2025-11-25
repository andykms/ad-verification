import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Stats.module.css'
import { InfoCard } from '../../components/ui/InfoCard/InfoCard'
import { BarChart } from '../../components/ui/BarChart/BarChart'
import { CheckboxButton } from '../../components/ui/CheckboxButton/CheckboxButton'
import { DateRangePicker } from '../../components/ui/DateRangePicker/DateRangePicker'
import { Modal } from '../../components/ui/Modal/Modal'
import { PieChart } from '../../components/ui/PieChart/PieChart'
import { MiniLoader } from '../../components/ui/MiniLoader/MiniLoader'
import { ListButton } from '../../components/ui/ListButton/ListButton'
import { HomeButton } from '../../components/ui/HomeButton/HomeButton'
import { SettingsButton } from '../../components/ui/SettingsButton/SettingsButton'

export type StatsPagePeriod = 'today' | 'week' | 'month' | 'custom'

export interface StatsPageSummary {
  totalReviewed: number
  approvedPercentage: number
  rejectedPercentage: number
  requestChangesPercentage: number
  averageReviewTime: number
}

export interface StatsPageActivity {
  date: string
  approved: number
  rejected: number
  requestChanges: number
}

export interface StatsPageDecisions {
  approved: number
  rejected: number
  requestChanges: number
}

export interface StatsPageCategories {
  [key: string]: number
}

export interface StatsPageModeratorStats {
  totalReviewed: number
  todayReviewed: number
  thisWeekReviewed: number
  thisMonthReviewed: number
  averageReviewTime: number
  approvalRate: number
}

export interface StatsPageModerator {
  id: number
  name: string
  role: string
  statistics: StatsPageModeratorStats
  permissions: string[]
}

export interface StatsPageProps {
  summary: StatsPageSummary | null
  activity: StatsPageActivity[]
  decisions: StatsPageDecisions | null
  categories: StatsPageCategories
  moderator: StatsPageModerator | null
  onChangePeriod: (
    period: StatsPagePeriod,
    startDate?: Date,
    endDate?: Date
  ) => void
  choosenPeriod: {
    startDate: Date | null
    endDate: Date | null
  }
  choosenOption: StatsPagePeriod
}

export const StatsPage = (props: StatsPageProps) => {
  const {
    summary,
    activity,
    decisions,
    categories,
    onChangePeriod,
    choosenOption,
  } = props

  const [choosenFilterOption, setChoosenFilterOption] =
    useState<StatsPagePeriod>(choosenOption)

  const [openedModal, setOpenModal] = useState<boolean>(false)

  const getTitle = (title: StatsPagePeriod) => {
    switch (title) {
      case 'today':
        return 'cегодня'
      case 'week':
        return 'неделю'
      case 'month':
        return 'месяц'
      case 'custom':
        return `выбранный период`
      default:
        return title
    }
  }

  useEffect(() => {
    if (choosenFilterOption !== 'custom' && choosenOption) {
      onChangePeriod(choosenFilterOption)
    }
  }, [choosenFilterOption])

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
    <>
      <section className={styles.statsPage}>
        <header className={styles.statsPageHeader}>
          <div className={styles.statsFilters}>
            <CheckboxButton
              type={choosenFilterOption === 'today' ? 'primary-2' : 'theme-2'}
              onChange={() => setChoosenFilterOption('today')}
              checked={choosenFilterOption === 'today'}
            >
              Сегодня
            </CheckboxButton>
            <CheckboxButton
              type={choosenFilterOption === 'week' ? 'primary-2' : 'theme-2'}
              onChange={() => setChoosenFilterOption('week')}
              checked={choosenFilterOption === 'week'}
            >
              Неделя
            </CheckboxButton>
            <CheckboxButton
              type={choosenFilterOption === 'month' ? 'primary-2' : 'theme-2'}
              checked={choosenFilterOption === 'month'}
              onChange={() => setChoosenFilterOption('month')}
            >
              Месяц
            </CheckboxButton>
            <CheckboxButton
              type={choosenFilterOption === 'custom' ? 'primary-2' : 'theme-2'}
              onChange={() => {
                setOpenModal(true)
              }}
              checked={choosenFilterOption === 'custom'}
            >
              Пользовательский
            </CheckboxButton>
          </div>
        </header>
        <nav className={styles.nav}>
          <NavLink to="/list">
            <ListButton></ListButton>
          </NavLink>
          <NavLink to="/settings">
            <SettingsButton></SettingsButton>
          </NavLink>
          <NavLink to="/">
            <HomeButton></HomeButton>
          </NavLink>
        </nav>
        <div className={styles.statsFacts}>
          <InfoCard title="Проверено" value={summary?.totalReviewed} />
          <InfoCard
            title="Одобрено"
            value={`${summary?.approvedPercentage.toString().slice(0, 5)}%`}
          />
          <InfoCard
            title="Отклонено"
            value={`${summary?.rejectedPercentage.toString().slice(0, 5)}%`}
          />
          <InfoCard
            title="Среднее время на проверку объявлений"
            value={summary && getTime(summary.averageReviewTime)}
          />
        </div>
        <div className={styles.statsCharts}>
          {activity.length > 0 ? (
            <BarChart
              title={`Активность за ${getTitle(choosenFilterOption)}`}
              data={activity.map((item) => {
                return {
                  title: item.date,
                  одобрено: item.approved,
                  отклонено: item.rejected,
                  'на доработку': item.requestChanges,
                }
              })}
            />
          ) : (
            <MiniLoader />
          )}
        </div>
        <div className={styles.statsPieChart}>
          {decisions ? (
            <PieChart
              title={`Распределение решений за ${getTitle(choosenFilterOption)}`}
              data={[
                {
                  title: 'одобрено',
                  value: decisions.approved,
                },
                {
                  title: 'отклонено',
                  value: decisions.rejected,
                },
                {
                  title: 'на доработку',
                  value: decisions.requestChanges,
                },
              ]}
            ></PieChart>
          ) : (
            <MiniLoader />
          )}
        </div>
        <div className={styles.statsCharts}>
          <BarChart
            title={`Категории проверенных объявлений за ${getTitle(choosenFilterOption)}`}
            data={Object.keys(categories).map((key) => {
              return {
                title: key,
                Категория: categories[key],
              }
            })}
          ></BarChart>
        </div>
        <div></div>
      </section>
      {openedModal && (
        <Modal
          onClose={() => {
            setOpenModal(false)
          }}
        >
          <DateRangePicker
            onSet={(startDate, endDate) => {
              setChoosenFilterOption('custom')
              onChangePeriod('custom', startDate, endDate)
              setOpenModal(false)
            }}
          />
        </Modal>
      )}
    </>
  )
}
