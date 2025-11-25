import React, { useState, useRef, useEffect } from 'react'
import styles from './BarChart.module.css'

interface DataItem {
  [key: string]: number | string
}

interface BarChartProps {
  data: DataItem[]
  title: string
}

const COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
]

export const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const [tooltip, setTooltip] = useState<{
    value: number
    key: string
    x: number
    y: number
  } | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!data.length) return null

  const keys = Object.keys(data[0]).filter((key) => key !== 'title')
  const maxValue = Math.max(
    ...data.flatMap((item) => keys.map((key) => Number(item[key])))
  )

  const chartWidth = isMobile ? 360 : window.innerWidth < 1024 ? 400 : 600
  const groupSpacing = isMobile ? 10 : 50
  const sidePadding = isMobile ? 25 : 50

  const totalWidth =
    sidePadding * 2 +
    data.length * keys.length * 40 +
    (data.length - 1) * groupSpacing

  const getColor = (key: string) => {
    const index = keys.indexOf(key)
    return COLORS[index % COLORS.length]
  }

  return (
    <div className={styles.container} style={{ width: chartWidth }}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.labels}>
        {keys.map((key, index) => (
          <div className={styles.label} key={index}>
            <span
              className={styles.dot}
              style={{ backgroundColor: getColor(key) }}
            ></span>
            {key}
          </div>
        ))}
      </div>
      <div
        ref={chartRef}
        className={styles.chartWrapper}
        style={{ width: totalWidth }}
      >
        {data.map((item, groupIndex) => (
          <div
            key={item.groupTitle}
            className={styles.group}
            style={{
              marginLeft: groupIndex === 0 ? sidePadding : groupSpacing,
            }}
          >
            <div className={styles.bars}>
              {keys.map((key) => (
                <div
                  key={key}
                  className={styles.barContainer}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const chartRect = chartRef.current!.getBoundingClientRect()
                    setTooltip({
                      value: Number(item[key]),
                      key,
                      x: rect.left - chartRect.left + rect.width / 2,
                      y: rect.top - rect.height,
                    })
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <div
                    className={styles.bar}
                    style={{
                      height: `${(Number(item[key]) / maxValue) * 80}%`,
                      backgroundColor: getColor(key),
                    }}
                  />
                </div>
              ))}
            </div>
            <div className={styles.title}>{item.title}</div>
          </div>
        ))}
      </div>

      {tooltip && (
        <div
          className={styles.tooltip}
          style={{
            left: tooltip.x,
            top: tooltip.y - 40,
          }}
        >
          <div className={styles.tooltipValue}>{tooltip.value}</div>
          <div className={styles.tooltipKey}>{tooltip.key}</div>
        </div>
      )}
    </div>
  )
}
