import React, { useState, useRef } from 'react'
import styles from './DateRangePicker.module.css'
import { Button } from '../Button/Button'

interface DateRangePickerProps {
  onSet: (startDate: Date, endDate: Date) => void
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSet }) => {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [startDateValid, setStartDateValid] = useState<boolean>(false)
  const [endDateValid, setEndDateValid] = useState<boolean>(false)
  const [startDateTouched, setStartDateTouched] = useState<boolean>(false)
  const [endDateTouched, setEndDateTouched] = useState<boolean>(false)

  const startDateInputRef = useRef<HTMLInputElement>(null)
  const endDateInputRef = useRef<HTMLInputElement>(null)
  const startDateCalendarRef = useRef<HTMLInputElement>(null)
  const endDateCalendarRef = useRef<HTMLInputElement>(null)

  const isValidDate = (dateString: string): boolean => {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/
    if (!regex.test(dateString)) return false

    const [, day, month, year] = dateString.match(regex)!
    const dayNum = parseInt(day, 10)
    const monthNum = parseInt(month, 10)
    const yearNum = parseInt(year, 10)

    if (monthNum < 1 || monthNum > 12) return false
    if (dayNum < 1 || dayNum > 31) return false

    const date = new Date(yearNum, monthNum - 1, dayNum)
    return (
      date.getFullYear() === yearNum &&
      date.getMonth() === monthNum - 1 &&
      date.getDate() === dayNum
    )
  }

  const parseDate = (dateString: string): Date | null => {
    if (!isValidDate(dateString)) return null
    const [day, month, year] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day + 1)
  }

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setStartDate(value)
    setStartDateTouched(true)

    const valid = isValidDate(value)
    setStartDateValid(valid)

    if (!valid) {
      setEndDateValid(false)
      setEndDate('')
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEndDate(value)
    setEndDateTouched(true)
    setEndDateValid(isValidDate(value))
  }

  const openStartDateCalendar = () => {
    if (startDateCalendarRef.current) {
      startDateCalendarRef.current.showPicker()
    }
  }

  const openEndDateCalendar = () => {
    if (startDateValid && endDateCalendarRef.current) {
      endDateCalendarRef.current.showPicker()
    }
  }

  const handleStartDateCalendarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value) {
      const date = new Date(e.target.value)
      const formattedDate = formatDate(date)
      setStartDate(formattedDate)
      setStartDateValid(true)
      setStartDateTouched(true)
    }
  }

  const handleEndDateCalendarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value) {
      const date = new Date(e.target.value)
      const formattedDate = formatDate(date)
      setEndDate(formattedDate)
      setEndDateValid(true)
      setEndDateTouched(true)
    }
  }

  const handleSetDates = () => {
    if (startDateValid && endDateValid) {
      const start = parseDate(startDate)
      const end = parseDate(endDate)
      if (start && end) {
        onSet(start, end)
      }
    }
  }

  const getMinDateForEndCalendar = (): string => {
    if (startDateValid) {
      const start = parseDate(startDate)
      if (start) {
        return start.toISOString().split('T')[0]
      }
    }
    return ''
  }

  const canSubmit = startDateValid && endDateValid

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Начальная дата</label>
        <div className={styles.inputWrapper}>
          <input
            ref={startDateInputRef}
            type="text"
            value={startDate}
            onChange={handleStartDateChange}
            placeholder="дд-мм-гггг"
            className={`${styles.input} ${
              startDateTouched && !startDateValid ? styles.inputError : ''
            }`}
            maxLength={10}
          />
          <button
            type="button"
            className={styles.calendarButton}
            onClick={openStartDateCalendar}
            aria-label="Выбрать дату из календаря"
          >
            <CalendarIcon />
          </button>
          <input
            ref={startDateCalendarRef}
            type="date"
            className={styles.hiddenCalendar}
            onChange={handleStartDateCalendarChange}
            maxLength={10}
          />
        </div>
        {startDateTouched && !startDateValid && (
          <div className={styles.errorText}>
            Введите дату в формате дд-мм-гггг
          </div>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Конечная дата</label>
        <div className={styles.inputWrapper}>
          <input
            ref={endDateInputRef}
            type="text"
            value={endDate}
            onChange={handleEndDateChange}
            placeholder="дд-мм-гггг"
            disabled={!startDateValid}
            className={`${styles.input} ${
              !startDateValid ? styles.inputDisabled : ''
            } ${endDateTouched && !endDateValid ? styles.inputError : ''}`}
            maxLength={10}
          />
          <button
            type="button"
            className={styles.calendarButton}
            onClick={openEndDateCalendar}
            disabled={!startDateValid}
            aria-label="Выбрать дату из календаря"
          >
            <CalendarIcon />
          </button>
          <input
            ref={endDateCalendarRef}
            type="date"
            className={styles.hiddenCalendar}
            onChange={handleEndDateCalendarChange}
            min={getMinDateForEndCalendar()}
          />
        </div>
        {endDateTouched && !endDateValid && (
          <div className={styles.errorText}>
            Введите дату в формате дд-мм-гггг
          </div>
        )}
      </div>

      <Button type="primary" onClick={handleSetDates} disabled={!canSubmit}>
        Установить даты
      </Button>
    </div>
  )
}

const CalendarIcon: React.FC = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 9H21M17 13.0014L7 13M10.3333 17.0005L7 17M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
