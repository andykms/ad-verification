import React from 'react'
import { ImageCarousel } from '../ImageCarousel/ImageCarousel'
import { Button } from '../Button/Button'
import styles from './Card.module.css'

export interface ProductCardProps {
  id: number
  images: string[]
  title: string
  price: number
  category: string
  createdAt: string
  status: 'moderation' | 'approved' | 'rejected' | 'pending' | 'draft'
  priority: 'normal' | 'urgent'
  onOpen: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  images,
  title,
  price,
  category,
  createdAt,
  status,
  priority,
  onOpen,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      moderation: 'На модерации',
      approved: 'Одобрено',
      rejected: 'Отклонено',
      pending: 'в рассмотрении',
      draft: 'черновик',
    }
    return statusMap[status as keyof typeof statusMap]
  }

  const getStatusClass = (status: string) => {
    return styles[`status-${status}`]
  }

  const getPriorityClass = (priority: string) => {
    return styles[`priority-${priority}`]
  }

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.imageSection}>
          <ImageCarousel images={images} type="small" />
          <div className={`${styles.priority} ${getPriorityClass(priority)}`}>
            {priority === 'urgent' ? 'Срочный' : 'Обычный'}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.price}>{formatPrice(price)}</div>
          </div>

          <div className={styles.meta}>
            <div className={styles.category}>{category}</div>
            <div className={styles.date}>{formatDate(createdAt)}</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={`${styles.status} ${getStatusClass(status)}`}>
          {getStatusText(status)}
        </div>
        <Button type="primary" onClick={onOpen}>
          открыть
        </Button>
      </div>
    </div>
  )
}
