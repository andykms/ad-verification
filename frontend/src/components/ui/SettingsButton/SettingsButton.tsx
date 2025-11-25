import style from './SettingsButton.module.css'
import { Button } from '../../ui/Button/Button'
import { SettingsIcon } from '../../ui/SettingsIcon/SettingsIcon'

export const SettingsButton = () => {
  return (
    <Button type="theme" onClick={() => {}}>
      <div className={style.settingsButton}>
        <span>Настройки</span>
        <SettingsIcon width="25px" height="25px"></SettingsIcon>
      </div>
    </Button>
  )
}
