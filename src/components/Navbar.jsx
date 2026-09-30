import React from 'react'
import { NavLink } from 'react-router-dom'
import { Server, Home, Info, Key, Layers, Mail } from 'lucide-react'

export default function Navbar() {
  const currentEnv = import.meta.env.VITE_ENVIRONMENT || 'Development'
  const region = import.meta.env.VITE_AWS_REGION || 'us-east-1'

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="logo-brand">
          <Server style={{ color: '#ff9900' }} size={24} />
          <span>AWS React Portal</span>
          <span className="logo-badge">Static SPA</span>
        </NavLink>

        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
                <Home size={16} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Info size={16} /> About
              </NavLink>
            </li>
            <li>
              <NavLink to="/environment" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Key size={16} /> Env Variables
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <Layers size={16} /> AWS Services
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
