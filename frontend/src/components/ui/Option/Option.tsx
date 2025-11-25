import React from 'react'
import styles from './Option.module.css'
import { Checkbox } from '../Checkbox/Checkbox'

interface CheckboxProps {
  onChange: (selected: boolean) => void
  checked?: boolean
  disabled?: boolean
}

interface OptionProps {
  title: string
  onChange: (selected: boolean) => void
  checked?: boolean
  disabled?: boolean
}

export const Option: React.FC<OptionProps> = ({
  title,
  onChange,
  checked = false,
  disabled = false,
}) => {
  return (
    <div className={styles.option}>
      <Checkbox checked={checked} onChange={onChange} disabled={disabled} />
      <span className={styles.title}>{title}</span>
    </div>
  )
}
