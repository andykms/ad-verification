import React from 'react'
import styles from './ActionHistory.module.css'

interface ActionHistoryProps {
  actions: Array<{
    moderator: string
    date: string
    action: string
    comment?: string
  }>
  title?: string
}

export const ActionHistory: React.FC<ActionHistoryProps> = ({
  actions,
  title = 'История действий',
}) => {
  return (
    <div className={styles.actionHistory}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.actionsList}>
        {actions.length > 0 ? (
          actions.map((action, index) => (
            <div key={index} className={styles.actionItem}>
              <div className={styles.actionHeader}>
                <span className={styles.moderator}>{action.moderator}</span>
                <span className={styles.date}>{action.date}</span>
              </div>
              <div className={styles.actionContent}>
                <div className={styles.decision}>
                  <strong>Решение:</strong> {action.action}
                </div>
                {action.comment && (
                  <div className={styles.comment}>
                    <strong>Комментарий:</strong> {action.comment}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Нет истории действий</p>
          </div>
        )}
      </div>
    </div>
  )
}
