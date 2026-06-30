import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const skillGroups = [
  { category: 'Languages', items: [{ name: 'C++', level: 85 }, { name: 'C', level: 75 }, { name: 'JavaScript', level: 80 }, { name: 'Python', level: 70 }] },
  { category: 'Frontend', items: [{ name: 'React.js', level: 82 }, { name: 'HTML5', level: 88 }, { name: 'CSS3', level: 82 }, { name: 'Tailwind CSS', level: 82 }] },
  { category: 'Backend', items: [{ name: 'Node.js', level: 72 }, { name: 'Express.js', level: 70 }, { name: 'MongoDB', level: 68 }] },
  { category: 'ML / AI', items: [{ name: 'BERT / Transformers', level: 65 }, { name: 'PyTorch', level: 55 }, { name: 'Scikit-learn', level: 60 }] },
  { category: 'Tools', items: [{ name: 'Git', level: 80 }, { name: 'GitHub', level: 82 }, { name: 'VS Code', level: 90 }, { name: 'UiPath (RPA)', level: 55 }] },
]

function SkillBar({ name, level }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span style={{ fontSize: 13, color: '#C5C7BC' }}>{name}</span>
        <span className="font-mono" style={{ fontSize: 10, color: '#3a3633' }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: 'rgba(251,243,209,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #B6AE9F, #FBF3D1)' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle,rgba(182,174,159,0.03) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      </div>
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase font-mono mb-4" style={{ color: '#B6AE9F' }}>02 / Skills</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold mb-14" style={{ color: '#FBF3D1' }}>Technical Stack</motion.h2>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {skillGroups.map(({ category, items }) => (
              <motion.div key={category} variants={fadeUp} className="p-6 rounded-2xl transition-all duration-350 group"
                style={{ border: '1px solid rgba(182,174,159,0.1)', background: 'rgba(182,174,159,0.02)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(251,243,209,0.15)'; e.currentTarget.style.background = 'rgba(251,243,209,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(182,174,159,0.1)'; e.currentTarget.style.background = 'rgba(182,174,159,0.02)'; }}>
                <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: '#4a4640' }}>{category}</p>
                {items.map(s => <SkillBar key={s.name} name={s.name} level={s.level} />)}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
