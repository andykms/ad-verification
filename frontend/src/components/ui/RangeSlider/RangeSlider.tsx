import React, { useEffect } from 'react'
import styles from './RangeSlider.module.css'

interface RangeSliderProps {
  title: string
  minValue?: number
  maxValue?: number
  onChangeMin: (value: number) => void
  onChangeMax: (value: number) => void
  initialMin?: number
  initialMax?: number
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  title,
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
  initialMin,
  initialMax,
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value)
    if (isNaN(value)) {
      return
    }
    onChangeMin(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value)
    if (isNaN(value)) {
      return
    }
    onChangeMax(value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.inputs}>
        <input
          className={styles.input}
          placeholder="от"
          value={minValue}
          onChange={handleMinChange}
          min={initialMin}
          max={initialMax}
        />
        <input
          className={styles.input}
          placeholder="до"
          value={maxValue}
          onChange={handleMaxChange}
          min={initialMin}
          max={initialMax}
        />
      </div>
    </div>
  )
}
