import style from './CheckboxButton.module.css'
import { Button, type IButtonProps } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'

export const CheckboxButton = ({
  type,
  children,
  checked,
  onChange,
}: {
  type: IButtonProps['type']
  checked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
}) => {
  return (
    <Button onClick={() => onChange(!checked)} type={type}>
      <div className={style.checkboxButton}>
        <Checkbox checked={checked} onChange={onChange} type="radio" />
        {children}
      </div>
    </Button>
  )
}
