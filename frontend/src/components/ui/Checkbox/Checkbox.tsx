import React from 'react'
import styles from './Checkbox.module.css'
import clsx from 'clsx'

interface CheckboxProps {
  onChange: (selected: boolean) => void
  checked?: boolean
  disabled?: boolean
  type?: 'checkbox' | 'radio'
}

export const Checkbox: React.FC<CheckboxProps> = ({
  onChange,
  checked = false,
  disabled = false,
  type = 'checkbox',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked)
    }
  }

  return (
    <label
      className={`${styles.checkboxContainer} ${disabled ? styles.disabled : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.input}
      />
      <span className={clsx(styles.checkmark, styles[type])}>
        {checked && (
          <svg
            className={styles.checkIcon}
            viewBox="0 0 33 33"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m0 10.909 4.364-4.364 8.727 8.727 15.273-15.273 4.364 4.364-19.636 19.636z" />
          </svg>
        )}
      </span>
    </label>
  )
}
