import style from './Button.module.css'
import clsx from 'clsx'

export interface IButtonProps {
  onClick: () => void
  type:
    | 'primary'
    | 'tertiary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'transparent'
    | 'arrow'
    | 'theme'
    | 'theme-2'
    | 'primary-2'
  disabled?: boolean
  children: React.ReactNode
  styles?: React.CSSProperties
}

export const Button = (props: IButtonProps) => {
  const { onClick, type, disabled, children, styles } = props
  return (
    <button
      className={clsx(style.button, style[type])}
      disabled={disabled || false}
      onClick={onClick}
      style={styles}
    >
      {children}
    </button>
  )
}
