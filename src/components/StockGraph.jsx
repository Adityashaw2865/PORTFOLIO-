import { useRef, useState, useMemo, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const GITHUB_USERNAME = 'Adityashaw2865'
const WIDTH = 700
const HEIGHT = 260
const PAD_X = 20
const PAD_Y = 24

function monthKey(dateStr) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function monthLabel(key) {
  const [y, m] = key.split('-')
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString('en', { month: 'short' })
}

export default function StockGraph() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hoverIdx, setHoverIdx] = useState(null)
  const [monthlyData, setMonthlyData] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ok | error

  useEffect(() => {
    let cancelled = false
    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
        if (!res.ok) throw new Error('bad response')
        const json = await res.json()
        const days = json.contributions || []

        // Aggregate daily contributions into monthly totals
        const totals = {}
        days.forEach(d => {
          const key = monthKey(d.date)
          totals[key] = (totals[key] || 0) + (d.count || 0)
        })

        const sortedKeys = Object.keys(totals).sort()
        // Keep the last 12 months only
        const last12 = sortedKeys.slice(-12)
        const result = last12.map(key => ({ label: monthLabel(key), value: totals[key] }))

        if (!cancelled) {
          setMonthlyData(result)
          setStatus('ok')
        }
      } catch (err) {
        if (!cancelled) setStatus('error')
      }
    }
    fetchContributions()
    return () => { cancelled = true }
  }, [])

  const chart = useMemo(() => {
    if (!monthlyData || monthlyData.length < 2) return null

    const values = monthlyData.map(d => d.value)
    const minVal = Math.min(...values)
    const maxVal = Math.max(...values)
    const range = maxVal - minVal || 1
    const stepX = (WIDTH - PAD_X * 2) / (monthlyData.length - 1)

    const points = monthlyData.map((d, i) => {
      const x = PAD_X + i * stepX
      const y = HEIGHT - PAD_Y - ((d.value - minVal) / range) * (HEIGHT - PAD_Y * 2)
      return { x, y, ...d }
    })

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${HEIGHT - PAD_Y} L ${points[0].x} ${HEIGHT - PAD_Y} Z`

    return { linePath, areaPath, points }
  }, [monthlyData])

  if (status === 'loading') {
    return (
      <div className="rounded-2xl p-6 flex items-center justify-center"
        style={{ border: '1px solid rgba(var(--c4-rgb),0.08)', background: 'rgba(var(--c4-rgb),0.02)', minHeight: 260 }}>
        <p className="font-mono text-xs" style={{ color: 'var(--c9)' }}>Fetching GitHub activity…</p>
      </div>
    )
  }

  if (status === 'error' || !chart) {
    return (
      <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer"
        className="rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition-colors duration-200"
        style={{ border: '1px solid rgba(var(--c4-rgb),0.08)', background: 'rgba(var(--c4-rgb),0.02)', minHeight: 260, color: 'var(--c7)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--c1)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--c7)'}>
        <span className="font-mono text-xs">Couldn't load GitHub activity</span>
        <span className="font-mono text-xs" style={{ color: 'var(--c4)' }}>View on GitHub ↗</span>
      </a>
    )
  }

  const { points, linePath, areaPath } = chart
  const active = hoverIdx !== null ? points[hoverIdx] : points[points.length - 1]
  const first = points[0].value || 1
  const last = points[points.length - 1].value
  const isUp = last >= points[0].value
  const growthPct = (((last - points[0].value) / first) * 100).toFixed(0)

  return (
    <div ref={ref} className="rounded-2xl p-6 overflow-hidden relative"
      style={{ border: '1px solid rgba(var(--c4-rgb),0.08)', background: 'rgba(var(--c4-rgb),0.02)' }}>

      {/* Header: current value + growth badge, like a stock ticker */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--c6)' }}>
            GitHub Contributions / Month
          </p>
          <p className="font-display text-2xl font-bold" style={{ color: 'var(--c1)' }}>
            {active.value}
            <span className="text-sm font-normal ml-1" style={{ color: 'var(--c9)' }}>commits · {active.label}</span>
          </p>
        </div>
        <span className="font-mono text-xs px-3 py-1.5 rounded-lg"
          style={{
            background: isUp ? 'rgba(var(--chart-up-rgb),0.1)' : 'rgba(var(--chart-down-rgb),0.1)',
            color: isUp ? 'var(--chart-up)' : 'var(--chart-down)',
            border: isUp ? '1px solid rgba(var(--chart-up-rgb),0.25)' : '1px solid rgba(var(--chart-down-rgb),0.25)',
          }}>
          {isUp ? '▲' : '▼'} {Math.abs(growthPct)}%
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
              <stop offset="0%" stopColor="var(--chart-line)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--chart-line)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* horizontal grid lines */}
          {[0, 1, 2, 3].map(i => (
            <line key={i}
              x1={PAD_X} x2={WIDTH - PAD_X}
              y1={PAD_Y + (i * (HEIGHT - PAD_Y * 2)) / 3}
              y2={PAD_Y + (i * (HEIGHT - PAD_Y * 2)) / 3}
              stroke="rgba(var(--chart-grid-rgb),0.08)" strokeWidth="1"
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
            stroke="var(--chart-line)"
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
                fill="var(--chart-line)"
                stroke="var(--bg)"
                strokeWidth="2"
                style={{ transition: 'r 0.15s ease', cursor: 'pointer' }}
                onMouseEnter={() => setHoverIdx(i)}
              />
              <rect
                x={p.x - (WIDTH / points.length) / 2}
                y={0}
                width={WIDTH / points.length}
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
