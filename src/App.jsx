import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Packages from './pages/Packages'
import About from './pages/About'
import Contact from './pages/Contact'
import OrderModal from './components/OrderModal'

// Sahifa bo'ylab progress chizig'i (qo'shimcha effekt)
function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return <div className="scroll-progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Home />
        <Projects />
        <Skills />
        <Packages />
        <About />
        <Contact />
      </main>
      <Footer />
      <OrderModal />
    </>
  )
}
