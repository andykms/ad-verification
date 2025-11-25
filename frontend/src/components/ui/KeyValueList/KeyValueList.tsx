import React from 'react'
import styles from './KeyValueList.module.css'

interface KeyValueListProps {
  data: Record<string, string>
  title: string
}

export const KeyValueList: React.FC<KeyValueListProps> = ({ data, title }) => {
  const entries = Object.entries(data)

  return (
    <div className={styles.keyValueList}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.list}>
        {entries.map(([key, value]) => (
          <div key={key} className={styles.item}>
            <span className={styles.key}>{key}</span>
            <span className={styles.dots}></span>
            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
