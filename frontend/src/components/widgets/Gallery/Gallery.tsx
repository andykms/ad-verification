import React from 'react'
import { ProductCard, type ProductCardProps } from '../../ui/Card/Card'
import { SelectCard } from '../SelectCard/SelectCard'
import styles from './Gallery.module.css'

interface CardGalleryProps {
  cards: ProductCardProps[]
  children?: React.ReactNode
  selectMode: boolean
  onSelect: (id: number, isSelected: boolean) => void
  selected: number[]
}

export const CardGallery: React.FC<CardGalleryProps> = ({
  cards,
  children,
  selectMode,
  onSelect,
  selected,
}) => {
  if (cards.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Нет карточек для отображения</p>
      </div>
    )
  }

  return (
    <>
      {children}
      <div className={styles.gallery}>
        {cards.map((cardProps, index) =>
          selectMode ? (
            <SelectCard
              key={index * cardProps.id}
              product={cardProps}
              onSelect={(isSelect) => onSelect(cardProps.id, isSelect)}
              checked={selected.includes(cardProps.id)}
            />
          ) : (
            <div key={index} className={styles.cardWrapper}>
              <ProductCard {...cardProps} key={index} />
            </div>
          )
        )}
      </div>
    </>
  )
}
