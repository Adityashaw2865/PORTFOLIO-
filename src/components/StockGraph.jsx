import { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'

// Monthly cumulative progress — edit these numbers/months as your real solve count grows
const dataPoints = [
  { label: 'Mar', value: 60 },
  { label: 'Apr', value: 110 },
  { label: 'May', value: 170 },
  { label: 'Jun', value: 240 },
  { label: 'Jul', value: 310 },
  { label: 'Aug', value: 400 },
  { label: 'Sep', value: 480 },
  { label: 'Oct', value: 560 },
  { label: 'Nov', value: 620 },
  { label: 'Dec', value: 690 },
  { label: 'Jan', value: 730 },
  { label: 'Feb', value: 750 },
]

const WIDTH = 700
const HEIGHT = 260
const PAD_X = 20
const PAD_Y = 24

export default function StockGraph() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hoverIdx, setHoverIdx] = useState(null)

  const { linePath, areaPath, points } = useMemo(() => {
    const values = dataPoints.map(d => d.value)
    const minVal = Math.min(...values)
    const maxVal = Math.max(...values)
    const range = maxVal - minVal || 1
    const stepX = (WIDTH - PAD_X * 2) / (dataPoints.length - 1)

    const points = dataPoints.map((d, i) => {
      const x = PAD_X + i * stepX
      const y = HEIGHT - PAD_Y - ((d.value - minVal) / range) * (HEIGHT - PAD_Y * 2)
      return { x, y, ...d }
    })

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${HEIGHT - PAD_Y} L ${points[0].x} ${HEIGHT - PAD_Y} Z`

    return { linePath, areaPath, points }
  }, [])

  const active = hoverIdx !== null ? points[hoverIdx] : points[points.length - 1]
  const growthPct = (((points[points.length - 1].value - points[0].value) / points[0].value) * 100).toFixed(0)

  return (
    <div ref={ref} className="rounded-2xl p-6 overflow-hidden relative"
      style={{ border: '1px solid rgba(var(--c4-rgb),0.08)', background: 'rgba(var(--c4-rgb),0.02)' }}>

      {/* Header: current value + growth badge, like a stock ticker */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--c6)' }}>
            Problems Solved Trend
          </p>
          <p className="font-display text-2xl font-bold" style={{ color: 'var(--c1)' }}>
            {active.value}
            <span className="text-sm font-normal ml-1" style={{ color: 'var(--c9)' }}>solved · {active.label}</span>
          </p>
        </div>
        <span className="font-mono text-xs px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' }}>
          ▲ {growthPct}% YoY
        </span>
      </div>

      {/* The chart */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full"
          style={{ minWidth: 480 }}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--c1)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--c1)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* horizontal grid lines */}
          {[0, 1, 2, 3].map(i => (
            <line key={i}
              x1={PAD_X} x2={WIDTH - PAD_X}
              y1={PAD_Y + (i * (HEIGHT - PAD_Y * 2)) / 3}
              y2={PAD_Y + (i * (HEIGHT - PAD_Y * 2)) / 3}
              stroke="rgba(var(--c4-rgb),0.08)" strokeWidth="1"
            />
          ))}

          {/* animated area fill */}
          <motion.path
            d={areaPath}
            fill="url(#stockFill)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* animated line draw, like a stock ticker plotting itself */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="var(--c1)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* hover targets + dots */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x} cy={p.y}
                r={hoverIdx === i ? 5 : 3}
                fill="var(--c1)"
                stroke="var(--bg, #0b0b0c)"
                strokeWidth="2"
                style={{ transition: 'r 0.15s ease', cursor: 'pointer' }}
                onMouseEnter={() => setHoverIdx(i)}
              />
              <rect
                x={p.x - (WIDTH / dataPoints.length) / 2}
                y={0}
                width={WIDTH / dataPoints.length}
                height={HEIGHT}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
              />
            </g>
          ))}

          {/* x-axis month labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={HEIGHT - 4}
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="var(--c9)"
              opacity={hoverIdx === i ? 1 : 0.6}
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}
