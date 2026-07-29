import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import DSA from './components/DSA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import CommandPalette from './components/CommandPalette'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <div className="font-sans antialiased overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--c2)', transition: 'background 0.4s ease, color 0.4s ease' }}>
      <Loader />
      <ThemeToggle />
      <CommandPalette />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <DSA />
      <Contact />
      <Footer />
    </div>
  )
}
