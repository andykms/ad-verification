import React, { useState, useRef, useEffect } from 'react'
import styles from './PieChart.module.css'

interface PieChartData {
  title: string
  value: number
}

interface PieChartProps {
  data: PieChartData[]
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

export const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!data.length) return null

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const normalizedData = data.map((item) => ({
    ...item,
    value: (item.value / total) * 100,
  }))

  const chartSize = isMobile ? 250 : 400
  const radius = chartSize * 0.4
  const center = chartSize / 2

  let currentAngle = 0

  const calculateSegmentPath = (value: number) => {
    const angle = (value / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const startAngleRad = (startAngle - 90) * (Math.PI / 180)
    const endAngleRad = (endAngle - 90) * (Math.PI / 180)

    const x1 = center + radius * Math.cos(startAngleRad)
    const y1 = center + radius * Math.sin(startAngleRad)
    const x2 = center + radius * Math.cos(endAngleRad)
    const y2 = center + radius * Math.sin(endAngleRad)

    const largeArcFlag = angle > 180 ? 1 : 0

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
  }

  const handleSegmentMouseEnter = (value: number, index: number) => {
    setHoveredSegment(index)

    let tempAngle = 0
    for (let i = 0; i < index; i++) {
      tempAngle += (normalizedData[i].value / 100) * 360
    }

    const segmentStartAngle = tempAngle
    const midAngle = segmentStartAngle + ((value / 100) * 360) / 2 - 90
    const midAngleRad = midAngle * (Math.PI / 180)

    const tooltipDistance = radius * 0.7
    const x = center + tooltipDistance * Math.cos(midAngleRad)
    const y = center + tooltipDistance * Math.sin(midAngleRad)

    setTooltipPosition({ x, y })
  }

  const getColor = (index: number) => COLORS[index % COLORS.length]

  return (
    <div className={styles.container} style={{ width: chartSize }}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.legend}>
        {normalizedData.map((item, index) => (
          <div key={item.title} className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: getColor(index) }}
            />
            <span className={styles.legendText}>{item.title}</span>
          </div>
        ))}
      </div>

      <svg
        ref={svgRef}
        width={chartSize}
        height={chartSize}
        className={styles.chart}
      >
        {normalizedData.map((item, index) => {
          const path = calculateSegmentPath(item.value)
          return (
            <path
              key={index}
              d={path}
              fill={getColor(index)}
              className={styles.segment}
              onMouseEnter={() => handleSegmentMouseEnter(item.value, index)}
              onMouseLeave={() => setHoveredSegment(null)}
              style={{
                opacity:
                  hoveredSegment === null || hoveredSegment === index ? 1 : 0.7,
                transform:
                  hoveredSegment === index ? 'scale(1.02)' : 'scale(1)',
                transformOrigin: 'center',
              }}
            />
          )
        })}

        <circle
          cx={center}
          cy={center}
          r={radius * 0.3}
          fill="var(--theme-hover)"
        />
      </svg>

      {hoveredSegment !== null && (
        <div
          className={styles.tooltip}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
        >
          <div className={styles.tooltipValue}>
            {normalizedData[hoveredSegment].value.toFixed(1)}%
          </div>
          <div className={styles.tooltipTitle}>
            {normalizedData[hoveredSegment].title}
          </div>
        </div>
      )}
    </div>
  )
}
