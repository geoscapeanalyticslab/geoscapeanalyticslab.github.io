import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Research from './pages/Research'
import People from './pages/People'
import Blogs from './pages/Blogs'
import Visualization from './pages/Visualization'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"              element={<Home />}          />
            <Route path="/research"      element={<Research />}      />
            <Route path="/people"        element={<People />}        />
            <Route path="/blogs"         element={<Blogs />}         />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/contact"       element={<Contact />}       />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
