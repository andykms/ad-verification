import React, { useState, useRef, useEffect } from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import styles from './MultiSelectDropdown.module.css'

export interface DropdownOption {
  name: string
  isSelected: boolean
}

interface MultiSelectDropdownProps {
  title: string
  options: DropdownOption[]
  onSelect: (name: string) => void
  onUnselect: (name: string) => void
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  title,
  options,
  onSelect,
  onUnselect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionChange = (name: string, selected: boolean) => {
    if (selected) {
      onSelect(name)
    } else {
      onUnselect(name)
    }
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

  const selectedCount = options.filter((option) => option.isSelected).length
  const displayTitle = selectedCount > 0 ? `${title} (${selectedCount})` : title

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleDropdown}
        type="button"
      >
        <span className={styles.dropdownTitle}>{displayTitle}</span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <label key={option.name} className={styles.option}>
              <span className={styles.optionText}>{option.name}</span>
              <Checkbox
                checked={option.isSelected}
                onChange={(selected) =>
                  handleOptionChange(option.name, selected)
                }
              />
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
