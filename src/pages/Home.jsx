import React from 'react'
import { Link } from 'react-router-dom'
import { Cloud, CheckCircle, Zap, Shield, Key, ArrowRight } from 'lucide-react'

export default function Home() {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'AWS React Portal'
  const envName = import.meta.env.VITE_ENVIRONMENT || 'Development'
  const region = import.meta.env.VITE_AWS_REGION || 'us-east-1'

  return (
    <div>
      <section className="hero">
        <div className="hero-tag">
          <Cloud size={16} /> AWS Static
        </div>
        <h1 className="hero-title">
          Multi-Route Static <span>React Portal</span>
        </h1>
        <p className="hero-desc">
          A lightweight, high-performance static React application pre-configured with Vite, 
          Client-Side Routing, and Environment Variable injection for AWS EC2, S3, and Amplify.
        </p>
        <div className="btn-group">
          <Link to="/environment" className="btn btn-primary">
            <Key size={18} /> Inspect Environment Variables <ArrowRight size={18} />
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn Architecture
          </Link>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={22} color="#ff9900" /> Key Features & Capabilities
        </h2>

        <div className="grid-3">
          <div className="glass-card">
            <div style={{ background: 'rgba(255, 153, 0, 0.12)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Key size={24} color="#ff9900" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Env Variable Testing</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Test build-time env injection via <code>.env</code> files or AWS build settings (e.g. <code>VITE_AWS_REGION</code>).
            </p>
          </div>

          <div className="glass-card">
            <div style={{ background: 'rgba(6, 182, 212, 0.12)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Zap size={24} color="#06b6d4" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Multiple SPA Routes</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Instant navigation across 5 static pages (Home, About, Env Vars, Services, Contact) using React Router DOM v6.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Shield size={24} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>AWS Hosting Ready</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Generates clean, static <code>dist/</code> artifacts optimized for AWS EC2 Nginx/Apache, AWS Amplify, or S3 + CloudFront.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(255, 153, 0, 0.05), rgba(17, 24, 39, 0.8))', borderColor: 'rgba(255, 153, 0, 0.2)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#ff9900' }}>Active Host Summary</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Current application configuration retrieved from active process environment variables:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>App Title</span>
              <div style={{ fontWeight: '700' }}>{appTitle}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Environment</span>
              <div style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>{envName}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Target AWS Region</span>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>{region}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
