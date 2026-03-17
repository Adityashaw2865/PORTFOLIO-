export default function Footer() {
  return (
    <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(182,174,159,0.06)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4" style={{ color: '#2a2826' }}>
        <p className="font-display tracking-tight text-sm" style={{ color: '#2a2826' }}>
          <span style={{ color: 'rgba(251,243,209,0.3)' }}>A</span>ditya Kumar Shaw<span style={{ color: 'rgba(251,243,209,0.3)' }}>.</span>
        </p>
        <p className="font-mono text-xs" style={{ color: '#2a2826' }}>Built with React · Tailwind · Framer Motion</p>
        <p className="font-mono text-xs" style={{ color: '#2a2826' }}>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
