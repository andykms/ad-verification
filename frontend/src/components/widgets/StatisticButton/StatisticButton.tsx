import style from './StatistictButton.module.css'
import { Button } from '../../ui/Button/Button'
import { StatisticIcon } from '../../ui/StatisticIcon/StatisticIcon'

export const StatisticButton = () => {
  return (
    <Button type="theme" onClick={() => {}}>
      <div className={style.statisticButton}>
        <span>Статистика</span>
        <StatisticIcon width="25px" height="25px"></StatisticIcon>
      </div>
    </Button>
  )
}
