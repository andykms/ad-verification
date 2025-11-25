import style from './HomeButton.module.css'
import { Button } from '../../ui/Button/Button'
import { SettingsIcon } from '../../ui/SettingsIcon/SettingsIcon'

export const HomeButton = () => {
  return (
    <Button type="theme" onClick={() => {}}>
      <div className={style.homeButton}>
        <span>На главную</span>
        <HomeSvg width="25px" height="25px"></HomeSvg>
      </div>
    </Button>
  )
}

export const HomeSvg = ({
  width,
  height,
}: {
  width: string
  height: string
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 3.1875L21.4501 10.275L21.0001 11.625H20.25V20.25H3.75005V11.625H3.00005L2.55005 10.275L12 3.1875ZM5.25005 10.125V18.75H18.75V10.125L12 5.0625L5.25005 10.125Z"
      fill="var(--text-color)"
    />
  </svg>
)
