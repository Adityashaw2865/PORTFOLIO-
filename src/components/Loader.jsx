import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#080808' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold tracking-tight"
            style={{ color: '#FBF3D1' }}
          >
            Aditya<span style={{ color: '#B6AE9F' }}>.</span>
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] mt-5 rounded-full overflow-hidden"
            style={{ background: 'rgba(251,243,209,0.08)' }}
          >
            <motion.div
              initial={{ x: -120 }}
              animate={{ x: 120 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
              style={{ background: 'linear-gradient(90deg, transparent, #FBF3D1, transparent)' }}
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="font-mono text-xs tracking-widest uppercase mt-4"
            style={{ color: '#4a4640' }}
          >
            Loading...
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
