import style from './SettingsPage.module.css'
import { ThemeSwitcher } from '../../components/widgets/ThemeSwitcher/ThemeSwitcher'
import { NavLink } from 'react-router-dom'
import { StatisticButton } from '../../components/widgets/StatisticButton/StatisticButton'
import { HomeButton } from '../../components/ui/HomeButton/HomeButton'
import { ListButton } from '../../components/ui/ListButton/ListButton'

export const SettingsPage = () => {
  return (
    <section className={style.settings}>
      <h1 className={style.title}>Настройки</h1>
      <nav className={style.nav}>
        <NavLink to="/list">
          <ListButton></ListButton>
        </NavLink>
        <NavLink to="/stats">
          <StatisticButton></StatisticButton>
        </NavLink>
        <NavLink to="/">
          <HomeButton></HomeButton>
        </NavLink>
      </nav>
      <ThemeSwitcher />
    </section>
  )
}
