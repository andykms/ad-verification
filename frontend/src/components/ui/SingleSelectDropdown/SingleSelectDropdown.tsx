import React, { useState, useRef, useEffect } from 'react'
import styles from './SingleSelectDropdown.module.css'

interface SingleSelectDropdownProps {
  options: string[]
  initialSelected: string | null
  onChange: (name: string | null) => void
  placeholder?: string
}

export const SingleSelectDropdown: React.FC<SingleSelectDropdownProps> = ({
  options,
  initialSelected,
  onChange,
  placeholder = 'Выберите опцию',
}) => {
  useEffect(() => {
    setSelected(initialSelected)
  }, [initialSelected])

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(initialSelected)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionSelect = (option: string | null) => {
    setSelected(option)
    onChange(option)
    setIsOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    setSelected(null)
    onChange(null)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleDropdown}
        type="button"
      >
        <span className={selected ? styles.selectedText : styles.placeholder}>
          {selected || placeholder}
        </span>
        <div className={styles.iconsContainer}>
          {selected && (
            <svg
              className={styles.clearIcon}
              onClick={handleClear}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                fill="currentColor"
              />
            </svg>
          )}
          <svg
            className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option}
              className={`${styles.option} ${option === selected ? styles.selected : ''}`}
              onClick={() => handleOptionSelect(option)}
              type="button"
            >
              <span className={styles.optionText}>{option}</span>
              {option === selected && (
                <svg
                  className={styles.checkIcon}
                  viewBox="0 -4.5 33 33"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleClear}
                >
                  <path d="m0 10.909 4.364-4.364 8.727 8.727 15.273-15.273 4.364 4.364-19.636 19.636z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
