import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Server, Home, BookOpen, Github, CloudSun, Key, Cpu, Info, Mail, Menu, X } from 'lucide-react'

export default function Navbar() {
  const currentEnv = import.meta.env.VITE_ENVIRONMENT || 'Production'
  const region = import.meta.env.VITE_AWS_REGION || 'us-east-1'
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <NavLink to="/" className="logo-brand" onClick={closeMobile}>
          <div className="logo-icon-bg">
            <Server style={{ color: '#ff9900' }} size={20} />
          </div>
          <div>
            <span style={{ color: '#fff', fontWeight: '800' }}>CloudScale</span>{' '}
            <span style={{ color: '#94a3b8', fontWeight: '400', fontSize: '0.85rem' }}>AWS</span>
          </div>
        </NavLink>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Desktop Navigation Links */}
        <nav className={`nav-menu ${mobileOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMobile} end>
                <Home size={15} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/playbook" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMobile}>
                <BookOpen size={15} color="#ff9900" /> Playbook
              </NavLink>
            </li>
            <li>
              <NavLink to="/github" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMobile}>
                <Github size={15} /> GitHub
              </NavLink>
            </li>
            <li>
              <NavLink to="/weather" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMobile}>
                <CloudSun size={15} /> Weather
              </NavLink>
            </li>
            <li>
              <NavLink to="/environment" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMobile}>
                <Key size={15} /> Env Vars
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMobile}>
                <Cpu size={15} /> Infrastructure
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMobile}>
                <Info size={15} /> About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMobile}>
                <Mail size={15} /> Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Status Pill */}
        <div className="env-header-pill">
          <span className="pulse-dot"></span>
          <span>{currentEnv} ({region})</span>
        </div>
      </div>
    </header>
  )
}
