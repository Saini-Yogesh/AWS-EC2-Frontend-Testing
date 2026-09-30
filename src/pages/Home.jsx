import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Github, CloudSun, Key, Cpu, ArrowRight, Zap, Shield, TrendingUp, CheckCircle, RefreshCw } from 'lucide-react'

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
      const res = await fetch(`${cryptoApiUrl}?ids=bitcoin,ethereum,solana,cardano&vs_currencies=usd&include_24hr_change=true`)
      if (res.ok) {
        const data = await res.json()
        setCryptoData(data)
      }
    } catch (err) {
      console.error('Crypto ticker error:', err)
    } finally {
      setLoadingCrypto(false)
    }
  }

  useEffect(() => {
    fetchCrypto()
  }, [])

  return (
    <div>
      {/* Hero Header */}
      <section className="hero">
        <div className="hero-pill">
          <Cloud size={16} /> AWS Static Web Hosting Test Portal
        </div>
        <h1 className="hero-title">
          Cloud Scale <span>React Telemetry</span>
        </h1>
        <p className="hero-desc">
          A high-performance, responsive multi-route static React web application. Integrated with live public APIs 
          (GitHub Explorer, Weather & Geo Telemetry) and environment variable injection for AWS EC2, S3, and Amplify.
        </p>

        <div className="btn-group">
          <Link to="/github" className="btn btn-primary">
            <Github size={18} /> Launch GitHub Explorer <ArrowRight size={18} />
          </Link>
          <Link to="/weather" className="btn btn-cyan">
            <CloudSun size={18} /> Weather Telemetry
          </Link>
          <Link to="/environment" className="btn btn-secondary">
            <Key size={18} /> Inspect Env Vars
          </Link>
        </div>
      </section>

      {/* Live Market Ticker */}
      <section style={{ marginTop: '2.5rem' }}>
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)' }}>
              <TrendingUp size={18} /> Live Market & Cloud Metric Ticker
            </h3>
            <button onClick={fetchCrypto} className="btn btn-secondary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }} disabled={loadingCrypto}>
              <RefreshCw size={13} className={loadingCrypto ? 'spin' : ''} /> Refresh Ticker
            </button>
          </div>

          <div className="grid-4" style={{ marginTop: '0' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>BITCOIN (BTC)</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                {cryptoData?.bitcoin?.usd ? `$${cryptoData.bitcoin.usd.toLocaleString()}` : '$92,450.00'}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>
                {cryptoData?.bitcoin?.usd_24h_change ? `${cryptoData.bitcoin.usd_24h_change.toFixed(2)}% (24h)` : '+2.4%'}
              </span>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ETHEREUM (ETH)</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-purple)' }}>
                {cryptoData?.ethereum?.usd ? `$${cryptoData.ethereum.usd.toLocaleString()}` : '$3,420.00'}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>
                {cryptoData?.ethereum?.usd_24h_change ? `${cryptoData.ethereum.usd_24h_change.toFixed(2)}% (24h)` : '+1.8%'}
              </span>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>SOLANA (SOL)</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                {cryptoData?.solana?.usd ? `$${cryptoData.solana.usd.toLocaleString()}` : '$210.50'}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>
                {cryptoData?.solana?.usd_24h_change ? `${cryptoData.solana.usd_24h_change.toFixed(2)}% (24h)` : '+4.2%'}
              </span>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>AWS EC2 STATUS</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                100% Operational
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '600' }}>
                {region} • Nginx 1.18
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tools Cards */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={22} color="#ff9900" /> Web Application Capabilities
        </h2>

        <div className="grid-3">
          <Link to="/github" className="glass-card" style={{ cursor: 'pointer' }}>
            <div style={{ background: 'rgba(255, 153, 0, 0.12)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Github size={26} color="#ff9900" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Live GitHub Explorer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              Search any GitHub user profile, view repositories, stars, forks, and language tags in real-time.
            </p>
            <span style={{ color: 'var(--accent-orange)', fontWeight: '700', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Open Tool <ArrowRight size={14} />
            </span>
          </Link>

          <Link to="/weather" className="glass-card" style={{ cursor: 'pointer' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.12)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <CloudSun size={26} color="#38bdf8" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Weather & IP Telemetry</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              Real-time weather metrics via Open-Meteo API & visitor IP location inspection.
            </p>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              View Telemetry <ArrowRight size={14} />
            </span>
          </Link>

          <Link to="/environment" className="glass-card" style={{ cursor: 'pointer' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Key size={26} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Env Variable Tester</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              Inspect client-side <code>import.meta.env</code> build variables and test custom variables dynamically.
            </p>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: '700', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Inspect Envs <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* Active Host Summary */}
      <section style={{ marginTop: '3rem' }}>
        <div className="glass-card" style={{ borderColor: 'rgba(255, 153, 0, 0.25)', background: 'linear-gradient(135deg, rgba(255, 153, 0, 0.05), rgba(15, 23, 42, 0.9))' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#ff9900', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={20} /> Active Host & Deployment Configuration
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Current application parameters read from process environment variables:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Portal Name</span>
              <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{appTitle}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Environment</span>
              <div style={{ color: 'var(--accent-emerald)', fontWeight: '700', fontSize: '1.05rem' }}>{envName}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>AWS Region</span>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '1.05rem' }}>{region}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
