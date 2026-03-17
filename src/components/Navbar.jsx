import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Skills', 'Projects', 'DSA', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
      style={{ background: scrolled ? 'rgba(8,8,6,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(182,174,159,0.08)' : '1px solid transparent' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-lg font-semibold tracking-tight" style={{ color: '#FBF3D1', background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ color: '#B6AE9F' }}>A</span>ditya<span style={{ color: '#B6AE9F' }}>.</span>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <button onClick={() => scrollTo(link)} className="text-sm tracking-wide transition-colors duration-200" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b6560' }}
                onMouseEnter={e => e.target.style.color = '#DEDED1'}
                onMouseLeave={e => e.target.style.color = '#6b6560'}>
                {link}
              </button>
            </li>
          ))}
          <li>
            <a href="#" className="text-sm px-4 py-2 rounded-lg transition-all duration-200 font-mono"
              style={{ border: '1px solid rgba(251,243,209,0.2)', color: '#FBF3D1', background: 'transparent' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(251,243,209,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Resume
            </a>
          </li>
        </ul>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-5 h-0.5 transition-all duration-300" style={{ background: '#B6AE9F', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
          <span className="block w-5 h-0.5 transition-all duration-300" style={{ background: '#B6AE9F', opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-0.5 transition-all duration-300" style={{ background: '#B6AE9F', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(10,9,6,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(182,174,159,0.08)' }}>
            <ul className="flex flex-col py-4 px-6 gap-4">
              {links.map((link) => (
                <li key={link}>
                  <button onClick={() => scrollTo(link)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C5C7BC', fontSize: 14 }}>{link}</button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
