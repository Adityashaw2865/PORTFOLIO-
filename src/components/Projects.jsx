
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }

const projects = [
  {
    num: '01',
    title: 'Portfolio Website',
    desc: 'A modern, animated personal portfolio built with React, Tailwind CSS, and Framer Motion — featuring a command palette, theme toggle, and smooth scroll-based interactions.',
    highlight: 'Command palette (Ctrl+K) + dark/light theme',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    github: 'https://github.com/Adityashaw2865/PORTFOLIO',
    demo: 'https://adityaxshaw-portfolio.vercel.app/',
  },
  {
    num: '02',
    title: 'TaskFlow',
    desc: 'A MERN task tracker with full CRUD, real-time debounced search, filter/sort by status & priority, and a live stats dashboard.',
    highlight: 'Live dashboard with debounced real-time search',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
    github: 'https://github.com/Adityashaw2865/Taskflow',
    demo: 'https://taskflow-ochre-kappa.vercel.app/',
  },
  {
    num: '03',
    title: 'Fake News Detection',
    desc: 'Research project comparing classical ML (LR, SVM, XGBoost) against fine-tuned BERT on the WELFake dataset (72k articles) — BERT hit ~99.2% accuracy. Built during my ML internship at IIT Jharkhand.',
    highlight: '99.2% accuracy on 72k-article dataset',
    tags: ['Python', 'BERT', 'PyTorch', 'XGBoost', 'Streamlit'],
    github: 'https://github.com/Adityashaw2865/fake-news-detector',
    demo: null,
  },
  {
    num: '04',
    title: 'Ganga Aarti — Ramkrishnapur Ghat',
    desc: 'A live, bilingual (English/Hindi) static site for the Ganga Aarti at Ramkrishnapur Ghat, Howrah — one of my earliest deployed projects.',
    highlight: 'Bilingual, live in production',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    github: 'https://github.com/Adityashaw2865/Ganga_arati',
    demo: 'https://ganga-arati.vercel.app/',
  },
  {
    num: '05',
    title: 'Focusly',
    desc: 'A daily task tracker built to eliminate distraction — featuring clean task management, progress charts, and a minimal UI that keeps you in flow state.',
    highlight: 'Streak tracking + analytics heatmaps',
    tags: ['React', 'Vite', 'Recharts', 'Lucide React'],
    github: 'https://github.com/Adityashaw2865/focusly',
    demo: 'https://focusly-lilac.vercel.app/',
  },
  {
    num: '06',
    title: 'Inkline',
    desc: 'A full-stack blog platform with JWT-based auth, category tagging, likes, and a nested comment system — built on a clean MERN backend with a lightweight Vite + React frontend.',
    highlight: 'Secure auth + likes/comments system',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/Adityashaw2865/inkline-blog',
    demo: 'https://inkline-blog.vercel.app/',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase font-mono mb-4" style={{ color: 'var(--c4)' }}>03 / Projects</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold mb-14" style={{ color: 'var(--c1)' }}>Featured Work</motion.h2>

          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-5">
            {projects.map(({ num, title, desc, highlight, tags, github, demo }) => (
              <motion.div key={num} variants={fadeUp}
                className="group relative p-7 rounded-2xl flex flex-col transition-all duration-400"
                style={{ border: '1px solid rgba(var(--c4-rgb),0.08)', background: 'rgba(var(--c4-rgb),0.02)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(var(--c1-rgb),0.18)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(var(--c1-rgb),0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(var(--c4-rgb),0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(var(--c4-rgb),0.02)'; }}>
                <span className="font-display absolute top-5 right-6 font-bold select-none" style={{ fontSize: 48, color: 'rgba(var(--c1-rgb),0.06)' }}>{num}</span>
                <div className="w-1.5 h-1.5 rounded-full mb-5" style={{ background: '#FBF3D1' }} />
                <h3 className="font-display text-lg font-semibold mb-3 pr-10" style={{ color: 'var(--c2)' }}>{title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--c10)' }}>{desc}</p>
                {highlight && (
                  <div className="flex items-start gap-2 mb-6">
                    <span className="mt-0.5" style={{ color: 'var(--c1)', fontSize: 11 }}>✓</span>
                    <span className="text-xs font-mono leading-snug" style={{ color: 'rgba(var(--c1-rgb),0.65)' }}>{highlight}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tags.map(t => (
                    <span key={t} className="font-mono" style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(var(--c1-rgb),0.1)', color: 'rgba(var(--c1-rgb),0.55)', background: 'rgba(var(--c1-rgb),0.04)' }}>{t}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {!github && !demo && (
                    <span className="flex-1 text-center text-xs py-2 rounded-lg font-medium font-mono" style={{ border: '1px dashed rgba(var(--ov-rgb),0.1)', color: 'var(--c7)' }}>
                      Coming Soon
                    </span>
                  )}
                  {github && (
                    <a href={github} target="_blank" rel="noreferrer" className="flex-1 text-center text-xs py-2 rounded-lg font-medium transition-all duration-200" style={{ border: '1px solid rgba(var(--c1-rgb),0.18)', color: 'var(--c1)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(var(--c1-rgb),0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>GitHub ↗</a>
                  )}
                  {demo && (
                    <a href={demo} target="_blank" rel="noreferrer" className="flex-1 text-center text-xs py-2 rounded-lg font-medium transition-all duration-200" style={{ border: '1px solid rgba(var(--ov-rgb),0.07)', color: 'var(--c5)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(var(--ov-rgb),0.15)'; e.currentTarget.style.color = 'var(--c3)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(var(--ov-rgb),0.07)'; e.currentTarget.style.color = 'var(--c5)'; }}>Live Demo ↗</a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
