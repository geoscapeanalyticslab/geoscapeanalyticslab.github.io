import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Small delay to wait for page content to load
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const links = document.querySelectorAll('nav a')
    const handler = () => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
    links.forEach(l => l.addEventListener('click', handler))
    return () => links.forEach(l => l.removeEventListener('click', handler))
  }, [])

  return null
}