import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const dsaStats = [
  { value: '100+', label: 'LeetCode Solved', sub: 'Regular problem solving' },
  { value: '400+', label: 'CodeChef Solved', sub: 'Competitive programming' },
  { value: 'C++', label: 'Primary Language', sub: 'STL & competitive use' },
  { value: 'Daily', label: 'Practice Cadence', sub: 'Consistent grind' },
]

const topics = ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'Sorting & Searching', 'Recursion & Backtracking', 'Stack & Queue', 'Hashing', 'Binary Search', 'Greedy Algorithms', 'Two Pointers', 'Sliding Window']

const platforms = [
  { name: 'LeetCode', sub: '100+ problems', href: 'https://leetcode.com/u/Aditya_shaw2006/' },
  { name: 'GeeksForGeeks', sub: 'Practice & articles', href: 'https://www.geeksforgeeks.org/profile/adityaxshaw' },
  { name: 'Codeforces', sub: 'Competitive rounds', href: 'https://codeforces.com/profile/Aditya_Xshaw' },
  { name: 'CodeChef', sub: '400+ solved', href: 'https://www.codechef.com/users/aditya_shaw09' },
]

export default function DSA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="dsa" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(251,243,209,0.02) 0%,transparent 70%)', filter: 'blur(80px)' }} />
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#B6AE9F' }}>04 / DSA</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FBF3D1' }}>Algorithmic Thinking</motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl leading-relaxed mb-14" style={{ color: '#B6AE9F', fontSize: 15 }}>
            Data Structures & Algorithms form the backbone of my problem-solving approach. I practice regularly across multiple platforms to sharpen logic and prepare for top engineering roles.
          </motion.p>

          {/* Stats */}
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {dsaStats.map(({ value, label, sub }) => (
              <motion.div key={label} variants={fadeUp} className="p-6 rounded-2xl text-center transition-all duration-300"
                style={{ border: '1px solid rgba(182,174,159,0.08)', background: 'rgba(182,174,159,0.02)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(251,243,209,0.16)'; e.currentTarget.style.background = 'rgba(251,243,209,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(182,174,159,0.08)'; e.currentTarget.style.background = 'rgba(182,174,159,0.02)'; }}>
                <p className="font-display text-3xl font-bold mb-1" style={{ color: '#FBF3D1' }}>{value}</p>
                <p className="text-sm font-medium mb-1" style={{ color: '#C5C7BC' }}>{label}</p>
                <p className="text-xs" style={{ color: '#2e2c2a' }}>{sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Topics */}
            <motion.div variants={fadeUp} className="p-7 rounded-2xl" style={{ border: '1px solid rgba(182,174,159,0.08)', background: 'rgba(182,174,159,0.02)' }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: '#3a3633' }}>Topics Covered</p>
              <div className="flex flex-wrap gap-2">
                {topics.map(t => (
                  <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default"
                    style={{ background: 'rgba(251,243,209,0.03)', border: '1px solid rgba(251,243,209,0.07)', color: '#6b6560' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C5C7BC'; e.currentTarget.style.borderColor = 'rgba(251,243,209,0.18)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#6b6560'; e.currentTarget.style.borderColor = 'rgba(251,243,209,0.07)'; }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Platforms */}
            <motion.div variants={fadeUp} className="p-7 rounded-2xl" style={{ border: '1px solid rgba(182,174,159,0.08)', background: 'rgba(182,174,159,0.02)' }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: '#3a3633' }}>Platforms</p>
              <div className="flex flex-col gap-3">
                {platforms.map(({ name, sub, href }) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                    style={{ border: '1px solid rgba(251,243,209,0.07)', background: 'rgba(251,243,209,0.02)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(251,243,209,0.18)'; e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.background = 'rgba(251,243,209,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(251,243,209,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(251,243,209,0.02)'; }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#DEDED1' }}>{name}</p>
                      <p className="font-mono text-xs" style={{ color: '#3a3633' }}>{sub}</p>
                    </div>
                    <span className="ml-auto text-xs" style={{ color: '#2e2c2a' }}>↗</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
