import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import GithubExplorer from './pages/GithubExplorer'
import WeatherDashboard from './pages/WeatherDashboard'
import Environment from './pages/Environment'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', color: '#ff9900', fontWeight: '800' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        The route you navigated to does not exist in this static SPA router.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Home Dashboard
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/github" element={<GithubExplorer />} />
          <Route path="/weather" element={<WeatherDashboard />} />
          <Route path="/environment" element={<Environment />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
