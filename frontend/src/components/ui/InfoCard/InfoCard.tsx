import React from 'react'
import styles from './InfoCard.module.css'
import { MiniLoader } from '../MiniLoader/MiniLoader'

interface InfoCardProps {
  title: string
  value: string | number | null | undefined
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, value }) => {
  if (!value && value !== 0) {
    return (
      <div className={styles.card}>
        <MiniLoader />
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  )
}
