import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TYPED_STRINGS = ['Software Developer', 'DSA Enthusiast', 'React Developer', 'Problem Solver', 'ISRO Certified']

function useTyping(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = strings[idx]
    let timeout
    if (!deleting && charIdx < current.length) timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    else if (!deleting && charIdx === current.length) timeout = setTimeout(() => setDeleting(true), pause)
    else if (deleting && charIdx > 0) timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    else { setDeleting(false); setIdx(i => (i + 1) % strings.length) }
    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, idx, strings, speed, pause])
  return display
}

const C = { text: '#FBF3D1', muted: '#DEDED1', dim: '#C5C7BC', faint: '#B6AE9F' }

const wrap = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }
const item = { hidden: { opacity: 0, y: 38 }, visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } }

export default function Hero() {
  const typed = useTyping(TYPED_STRINGS)
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.022, backgroundImage: 'linear-gradient(rgba(251,243,209,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(251,243,209,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(251,243,209,0.045) 0%,transparent 65%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(182,174,159,0.035) 0%,transparent 70%)' }} />

      <motion.div className="relative z-10 max-w-4xl mx-auto text-center" variants={wrap} initial="hidden" animate="visible">

        {/* Open to work badge */}
        <motion.div variants={item} className="mb-7 inline-flex">
          <span className="text-xs tracking-[0.2em] uppercase font-mono px-4 py-1.5 rounded-full" style={{ color: C.dim, border: '1px solid rgba(197,199,188,0.18)', background: 'rgba(197,199,188,0.04)' }}>
            Open to Internships & Opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={item} className="font-display font-bold tracking-tight leading-[1.04] mb-5" style={{ fontSize: 'clamp(52px,10vw,96px)' }}>
          <span className="block" style={{ color: C.muted }}>Aditya</span>
          <span className="block" style={{ color: C.text }}>Kumar Shaw</span>
        </motion.h1>

        {/* Typing */}
        <motion.div variants={item} className="h-8 mb-5 flex items-center justify-center">
          <span className="font-mono text-lg" style={{ color: C.faint }}>
            {typed}
            <span className="inline-block w-[2px] h-5 ml-0.5 align-middle animate-pulse" style={{ background: C.text }} />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p variants={item} className="text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: C.faint }}>
          Focused on building <span style={{ color: C.muted }}>clean, efficient web experiences</span> and solving complex problems through code.
        </motion.p>

        {/* ISRO achievement */}
        <motion.div variants={item} className="mb-10 flex justify-center">
          <a href="https://isrolms.iirs.gov.in/mod/customcert/my_certificates.php?userid=414294&certificateid=136&downloadcert=1"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2.5 text-xs px-5 py-2.5 rounded-xl font-mono transition-all duration-300 hover:scale-[1.02]"
            style={{ background: 'rgba(251,243,209,0.05)', border: '1px solid rgba(251,243,209,0.18)', color: '#FBF3D1' }}>
            <span style={{ fontSize: 16 }}>🛰️</span>
            <span>ISRO / IIRS Certified &mdash; View Certificate ↗</span>
          </a>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{ background: '#FBF3D1', color: '#0a0906' }}>
            View Projects
          </button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: C.dim, background: 'rgba(255,255,255,0.02)' }}>
            Contact Me
          </button>
          <a href="#" className="px-7 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: C.dim, background: 'rgba(255,255,255,0.02)' }}>
            Download CV ↓
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={item} className="mt-20 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase font-mono" style={{ color: '#2a2826' }}>Scroll</span>
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, #2a2826, transparent)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
