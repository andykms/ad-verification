import { Children } from 'react'
import { Button, type IButtonProps } from '../Button/Button'

export interface ArrowButtonProps
  extends Omit<IButtonProps, 'children' | 'type'> {
  direction: 'left' | 'right'
  children?: React.ReactNode
  leftTitle?: string
  rightTitle?: string
}

export const ArrowButton = (props: ArrowButtonProps) => {
  const { direction, children, leftTitle, rightTitle, ...buttonProps } = props
  return (
    <Button {...{ ...buttonProps, type: 'arrow' }}>
      {children}
      {direction === 'left' ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20M4 12L8 8M4 12L8 16"
              stroke="var(--theme)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ color: 'var(--theme)' }}>
            {leftTitle ? leftTitle : 'Назад'}
          </span>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <span style={{ color: 'var(--theme)' }}>
            {rightTitle ? rightTitle : 'Вперёд'}
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20M20 12L16 8M20 12L16 16"
              stroke="var(--theme)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </Button>
  )
}
