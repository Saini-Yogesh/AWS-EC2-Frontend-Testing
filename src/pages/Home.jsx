import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Github, CloudSun, Key, ArrowRight, Zap, Shield, TrendingUp, RefreshCw, BookOpen } from 'lucide-react'

export default function Home() {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'AWS React Portal'
  const envName = import.meta.env.VITE_ENVIRONMENT || 'Production'
  const region = import.meta.env.VITE_AWS_REGION || 'us-east-1'
  const cryptoApiUrl = import.meta.env.VITE_CRYPTO_API_URL || 'https://api.coingecko.com/api/v3/simple/price'

  const [cryptoData, setCryptoData] = useState(null)
  const [loadingCrypto, setLoadingCrypto] = useState(true)

  const fetchCrypto = async () => {
    setLoadingCrypto(true)
    try {
      const res = await fetch(`${cryptoApiUrl}?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true`)
      if (res.ok) setCryptoData(await res.json())
    } catch (err) {
      console.error('Crypto error:', err)
    } finally {
      setLoadingCrypto(false)
    }
  }

  useEffect(() => { fetchCrypto() }, [])

  const cryptoItems = [
    { key: 'bitcoin', label: 'BITCOIN (BTC)', color: 'var(--accent-cyan)', fallbackPrice: '92,450', fallbackChange: '+2.4%' },
    { key: 'ethereum', label: 'ETHEREUM (ETH)', color: 'var(--accent-purple)', fallbackPrice: '3,420', fallbackChange: '+1.8%' },
    { key: 'solana', label: 'SOLANA (SOL)', color: 'var(--accent-emerald)', fallbackPrice: '210', fallbackChange: '+4.2%' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-pill">
          <Cloud size={16} /> AWS Static Web Hosting Test Portal
        </div>
        <h1 className="hero-title">
          Cloud Scale <span>React Telemetry</span>
        </h1>
        <p className="hero-desc">
          A high-performance, responsive multi-route static React app integrated with live public APIs —
          GitHub Explorer, Weather & Geo Telemetry, and environment variable injection for AWS.
        </p>
        <div className="btn-group">
          <Link to="/github" className="btn btn-primary">
            <Github size={18} /> GitHub Explorer <ArrowRight size={16} />
          </Link>
          <Link to="/weather" className="btn btn-cyan">
            <CloudSun size={18} /> Weather Telemetry
          </Link>
          <Link to="/playbook" className="btn btn-secondary">
            <BookOpen size={18} /> AWS Playbook
          </Link>
        </div>
      </section>

      {/* Market Ticker */}
      <section style={{ marginTop: '2.5rem' }}>
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.7))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)' }}>
              <TrendingUp size={18} /> Live Market Ticker
            </h3>
            <button onClick={fetchCrypto} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} disabled={loadingCrypto}>
              <RefreshCw size={13} className={loadingCrypto ? 'spin' : ''} /> Refresh
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {cryptoItems.map(({ key, label, color, fallbackPrice, fallbackChange }) => {
              const price = cryptoData?.[key]?.usd
              const change = cryptoData?.[key]?.usd_24h_change
              const changePos = change >= 0
              return (
                <div key={key} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: '800', color }}>{price ? `$${price.toLocaleString()}` : `$${fallbackPrice}`}</div>
                  <div style={{ fontSize: '0.78rem', color: changePos ? 'var(--accent-emerald)' : '#ef4444', fontWeight: '600', marginTop: '0.35rem' }}>
                    {change ? `${change.toFixed(2)}% (24h)` : fallbackChange}
                  </div>
                </div>
              )
            })}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>AWS EC2 STATUS</div>
              <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>Operational</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>{region} • Nginx</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={22} color="#ff9900" /> Application Capabilities
        </h2>
        <div className="grid-3">
          {[
            { to: '/github', icon: <Github size={26} color="#ff9900" />, bg: 'rgba(255,153,0,0.12)', title: 'GitHub Explorer', desc: 'Search any GitHub user profile, view repositories, stars, forks, and language tags in real-time.', linkColor: 'var(--accent-orange)', label: 'Open Tool' },
            { to: '/weather', icon: <CloudSun size={26} color="#38bdf8" />, bg: 'rgba(56,189,248,0.12)', title: 'Weather & IP Telemetry', desc: 'Real-time weather metrics for 6 global cities via Open-Meteo API & visitor IP location.', linkColor: 'var(--accent-cyan)', label: 'View Telemetry' },
            { to: '/playbook', icon: <BookOpen size={26} color="#10b981" />, bg: 'rgba(16,185,129,0.12)', title: 'AWS Deployment Playbook', desc: 'Interactive searchable documentation covering all 20 AWS EC2 deployment topics.', linkColor: 'var(--accent-emerald)', label: 'Read Playbook' },
          ].map(({ to, icon, bg, title, desc, linkColor, label }) => (
            <Link to={to} key={to} className="glass-card" style={{ cursor: 'pointer' }}>
              <div style={{ background: bg, width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', flexShrink: 0 }}>
                {icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.25rem', flex: 1 }}>{desc}</p>
              <span style={{ color: linkColor, fontWeight: '700', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}>
                {label} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Host Summary */}
      <section style={{ marginTop: '3rem' }}>
        <div className="glass-card" style={{ borderColor: 'rgba(255,153,0,0.22)', background: 'linear-gradient(135deg, rgba(255,153,0,0.05), rgba(15,23,42,0.9))' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: '#ff9900', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={20} /> Active Host Configuration
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.93rem' }}>
            Current application parameters read from process environment variables at build time:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Portal Name</span>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginTop: '0.25rem' }}>{appTitle}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Environment</span>
              <div style={{ color: 'var(--accent-emerald)', fontWeight: '700', fontSize: '1rem', marginTop: '0.25rem' }}>{envName}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>AWS Region</span>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '1rem', marginTop: '0.25rem' }}>{region}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
