import React, { useState } from 'react'
import styles from './ImageCarousel.module.css'

interface ImageCarouselProps {
  images?: string[]
  type?: 'small' | 'large'
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  type = 'small',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  if (!images) return <div className={styles.empty}>Нет изображений!</div>

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  if (images.length === 0) {
    return <div className={styles.empty}>Нет изображений!</div>
  }

  return (
    <div
      className={`${styles.carousel} ${styles[type]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img
          src={images[currentIndex]}
          alt={`Картинка номер ${currentIndex + 1}`}
          className={styles.image}
        />

        {isHovered && images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.left}`}
              onClick={prevImage}
              aria-label="Предыдующая картинка"
            >
              ‹
            </button>
            <button
              className={`${styles.arrow} ${styles.right}`}
              onClick={nextImage}
              aria-label="Следующая картинка"
            >
              ›
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className={styles.dots}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Перейти к картинке ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
