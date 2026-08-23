import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SiGithub, SiGmail, SiLeetcode } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

const C = { text: 'var(--c1)', muted: 'var(--c2)', dim: 'var(--c3)', faint: 'var(--c4)' }

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const socials = [
  { icon: SiGithub, label: 'GitHub', sub: 'github.com/Adityashaw2865', href: 'https://github.com/Adityashaw2865' },
  { icon: FaLinkedin, label: 'LinkedIn', sub: 'Connect with me', href: 'https://www.linkedin.com/in/aditya-kumar-shaw-481735326' },
  { icon: SiGmail, label: 'Email', sub: 'aks09adi@gmail.com', href: 'mailto:aks09adi@gmail.com' },
  { icon: SiLeetcode, label: 'LeetCode', sub: '200+ problems solved', href: 'https://leetcode.com/u/Aditya_shaw2006/' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(var(--c1-rgb),0.03) 0%,transparent 70%)', filter: 'blur(80px)' }} />
      <div className="max-w-5xl mx-auto relative" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase font-mono mb-4" style={{ color: C.faint }}>05 / Contact</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold mb-5" style={{ color: C.text }}>Let's Connect</motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl leading-relaxed mb-14" style={{ color: C.faint, fontSize: 15 }}>
            Open to internships, full-stack roles, and interesting collaborations. Reach out through any of these — I usually reply within a day.
          </motion.p>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4 mb-10">
            {socials.map(({ icon: Icon, label, sub, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                variants={fadeUp}
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300"
                style={{ border: '1px solid rgba(var(--c4-rgb),0.1)', background: 'rgba(var(--c4-rgb),0.02)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(var(--c1-rgb),0.18)'; e.currentTarget.style.background = 'rgba(var(--c1-rgb),0.04)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(var(--c4-rgb),0.1)'; e.currentTarget.style.background = 'rgba(var(--c4-rgb),0.02)'; e.currentTarget.style.transform = 'none' }}
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0" style={{ background: 'rgba(var(--c1-rgb),0.06)' }}>
                  <Icon style={{ fontSize: 20, color: 'var(--c1)' }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium" style={{ color: C.muted }}>{label}</p>
                  <p className="font-mono text-xs truncate" style={{ color: 'var(--c7)' }}>{sub}</p>
                </div>
                <span className="ml-auto text-xs shrink-0" style={{ color: 'var(--c9)' }}>↗</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            
              href="mailto:aks09adi@gmail.com"
              className="px-7 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{ background: '#FBF3D1', color: '#0a0906' }}
            >
              Say Hello ↗
            </a>
            
              href="https://drive.google.com/uc?export=download&id=1XPQ_YLToFbvxDPVJ_iXo6KeMOfaw0I4p"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{ border: '1px solid rgba(var(--ov-rgb),0.08)', color: C.dim, background: 'rgba(var(--ov-rgb),0.02)' }}
            >
              Download CV ↓
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
