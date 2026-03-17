import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const links = [
  { label: 'Email', value: 'aks09adi@gmail.com', href: 'mailto:aks09adi@gmail.com',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:20,height:20}}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
  { label: 'GitHub', value: 'github.com/Adityashaw2865', href: 'https://github.com/Adityashaw2865',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { label: 'LinkedIn', value: 'aditya-kumar-shaw', href: 'https://www.linkedin.com/in/aditya-kumar-shaw-481735326',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse,rgba(251,243,209,0.03) 0%,transparent 70%)', filter: 'blur(40px)' }} />
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#B6AE9F' }}>05 / Contact</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: '#FBF3D1' }}>Let's Connect</motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto leading-relaxed mb-14" style={{ color: '#B6AE9F' }}>
            Whether you have an internship opportunity, a collaboration idea, or just want to talk code — my inbox is always open.
          </motion.p>

          <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-4 mb-12">
            {links.map(({ label, value, href, icon }) => (
              <motion.a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" variants={fadeUp}
                className="group flex flex-col items-center p-7 rounded-2xl transition-all duration-300"
                style={{ border: '1px solid rgba(182,174,159,0.08)', background: 'rgba(182,174,159,0.02)', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(251,243,209,0.2)'; e.currentTarget.style.background = 'rgba(251,243,209,0.04)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(182,174,159,0.08)'; e.currentTarget.style.background = 'rgba(182,174,159,0.02)'; e.currentTarget.style.transform = 'none'; }}>
                <span className="mb-3" style={{ color: '#3a3633' }}>{icon}</span>
                <span className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: '#3a3633' }}>{label}</span>
                <span className="text-sm break-all" style={{ color: '#6b6560' }}>{value}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* ISRO certificate prominent */}
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <a href="https://isrolms.iirs.gov.in/mod/customcert/my_certificates.php?userid=414294&certificateid=136&downloadcert=1"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-mono text-sm transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'rgba(251,243,209,0.05)', border: '1px solid rgba(251,243,209,0.2)', color: '#FBF3D1' }}>
              🛰️ &nbsp;ISRO / IIRS Certificate — Download ↓
            </a>
          </motion.div>

          <motion.a variants={fadeUp} href="mailto:aks09adi@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95"
            style={{ background: 'rgba(251,243,209,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#FBF3D1', textDecoration: 'none' }}>
            <span>Say Hello</span>
            <span style={{ color: '#FBF3D1' }}>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
