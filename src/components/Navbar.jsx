import React from 'react'
import { NavLink } from 'react-router-dom'
import { Server, Home, Github, CloudSun, Key, Cpu, Info, Mail } from 'lucide-react'

export default function Navbar() {
  const currentEnv = import.meta.env.VITE_ENVIRONMENT || 'Production'
  const region = import.meta.env.VITE_AWS_REGION || 'us-east-1'

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="logo-brand">
          <div className="logo-icon-bg">
            <Server style={{ color: '#ff9900' }} size={22} />
          </div>
          <div>
            <span style={{ color: '#fff', fontWeight: '800' }}>CloudScale</span>{' '}
            <span style={{ color: '#94a3b8', fontWeight: '400', fontSize: '0.9rem' }}>AWS Portal</span>
          </div>
          <span className="logo-badge">Static React SPA</span>
        </NavLink>

        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
                <Home size={16} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/github" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Github size={16} /> GitHub Explorer
              </NavLink>
            </li>
            <li>
              <NavLink to="/weather" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <CloudSun size={16} /> Weather & Geo
              </NavLink>
            </li>
            <li>
              <NavLink to="/environment" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Key size={16} /> Env Vars
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Cpu size={16} /> Infrastructure
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Info size={16} /> About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Mail size={16} /> Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="env-header-pill">
          <span className="pulse-dot"></span>
          <span>{currentEnv} ({region})</span>
        </div>
      </div>
    </header>
  )
}
