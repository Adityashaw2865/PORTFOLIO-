import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiCplusplus, SiPython, SiJavascript, SiReact, SiHtml5, SiCss3,
  SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb,
  SiGit, SiGithub, SiPostman, SiNpm, SiFigma
} from 'react-icons/si'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const skillGroups = [
  { category: 'Languages', items: [{ name: 'C++', level: 85 }, { name: 'C', level: 75 }, { name: 'JavaScript', level: 80 }, { name: 'Python', level: 70 }] },
  { category: 'Frontend', items: [{ name: 'React.js', level: 82 }, { name: 'HTML5', level: 88 }, { name: 'CSS3', level: 82 }, { name: 'Tailwind CSS', level: 82 }] },
  { category: 'Backend', items: [{ name: 'Node.js', level: 72 }, { name: 'Express.js', level: 70 }, { name: 'MongoDB', level: 68 }] },
  { category: 'ML / AI', items: [{ name: 'BERT / Transformers', level: 65 }, { name: 'PyTorch', level: 55 }, { name: 'Scikit-learn', level: 60 }] },
  { category: 'Tools', items: [{ name: 'Git', level: 80 }, { name: 'GitHub', level: 82 }, { name: 'VS Code', level: 90 }, { name: 'UiPath (RPA)', level: 55 }] },
]

const iconStack = [
  { icon: SiCplusplus, name: 'C++' },
  { icon: SiPython, name: 'Python' },
  { icon: SiJavascript, name: 'JavaScript' },
  { icon: SiReact, name: 'React' },
  { icon: SiHtml5, name: 'HTML5' },
  { icon: SiCss3, name: 'CSS3' },
  { icon: SiTailwindcss, name: 'Tailwind' },
  { icon: SiNodedotjs, name: 'Node.js' },
  { icon: SiExpress, name: 'Express' },
  { icon: SiMongodb, name: 'MongoDB' },
  { icon: SiGit, name: 'Git' },
  { icon: SiGithub, name: 'GitHub' },
  { icon: SiPostman, name: 'Postman' },
  { icon: SiNpm, name: 'npm' },
  { icon: SiFigma, name: 'Figma' },
]

function SkillBar({ name, level }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span style={{ fontSize: 13, color: 'var(--c3)' }}>{name}</span>
        <span className="font-mono" style={{ fontSize: 10, color: 'var(--c6)' }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: 'rgba(var(--c1-rgb),0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, var(--c4), var(--c1))' }}
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
        <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle,rgba(var(--c4-rgb),0.03) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      </div>
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase font-mono mb-4" style={{ color: 'var(--c4)' }}>02 / Skills</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold mb-14" style={{ color: 'var(--c1)' }}>Technical Stack</motion.h2>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {skillGroups.map(({ category, items }) => (
              <motion.div key={category} variants={fadeUp} className="p-6 rounded-2xl transition-all duration-350 group"
                style={{ border: '1px solid rgba(var(--c4-rgb),0.1)', background: 'rgba(var(--c4-rgb),0.02)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(var(--c1-rgb),0.15)'; e.currentTarget.style.background = 'rgba(var(--c1-rgb),0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(var(--c4-rgb),0.1)'; e.currentTarget.style.background = 'rgba(var(--c4-rgb),0.02)'; }}>
                <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--c7)' }}>{category}</p>
                {items.map(s => <SkillBar key={s.name} name={s.name} level={s.level} />)}
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-16 flex flex-wrap items-center justify-center gap-8">
            {iconStack.map(({ icon: Icon, name }) => (
              <div key={name} className="flex flex-col items-center gap-2 group cursor-default">
                <Icon
                  className="transition-all duration-300 group-hover:scale-110"
                  style={{ fontSize: 36, color: 'var(--c4)' }}
                />
                <span className="text-[10px] font-mono uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--c6)' }}>
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
