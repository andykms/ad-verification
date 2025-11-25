import React from 'react'
import styles from './Pagination.module.css'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  maxVisiblePages?: number
  allItemsCount?: number
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
  allItemsCount = 0,
}) => {
  if (totalPages <= 1) return null

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  const generatePageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      if (startPage > 2) {
        pages.push('...')
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) {
        pages.push('...')
      }

      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()
  const isPreviousDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages

  return (
    <>
      <div className={styles.pagination}>
        <button
          className={`${styles.arrow} ${isPreviousDisabled ? styles.disabled : ''}`}
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          aria-label="Предыдущая страница"
        >
          ‹
        </button>

        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className={styles.ellipsis}>...</span>
            ) : (
              <button
                className={`${styles.page} ${page === currentPage ? styles.active : ''}`}
                onClick={() => handlePageClick(page as number)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          className={`${styles.arrow} ${isNextDisabled ? styles.disabled : ''}`}
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label="Следующая страница"
        >
          ›
        </button>
      </div>
      <span
        className={styles.totalItems}
      >{`Всего объявлений: ${allItemsCount}`}</span>
    </>
  )
}
