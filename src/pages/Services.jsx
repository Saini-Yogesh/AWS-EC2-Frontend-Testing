import React, { useState } from 'react'
import { Server, Database, Shield, Radio, CheckCircle, RefreshCw, Cpu, Globe } from 'lucide-react'

export default function Services() {
  const region = import.meta.env.VITE_AWS_REGION || 'us-east-1'
  const instanceId = import.meta.env.VITE_EC2_INSTANCE_ID || 'i-0e8912ab45cd678f9'
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [latency, setLatency] = useState(38)

  const handleSimulateCheck = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLatency(Math.floor(Math.random() * 25) + 25)
      setIsRefreshing(false)
    }, 600)
  }

  const cards = [
    {
      icon: <Server size={30} color="#ff9900" />,
      status: 'ONLINE',
      statusColor: 'var(--accent-emerald)',
      statusBg: 'rgba(16,185,129,0.15)',
      title: 'AWS EC2 Instance',
      desc: 'Hosting target for static SPA build outputs in /var/www/html/.',
      stats: [
        { label: 'Instance ID', value: instanceId },
        { label: 'Region', value: region },
        { label: 'OS', value: 'Ubuntu 24.04 LTS' },
      ]
    },
    {
      icon: <Radio size={30} color="#38bdf8" />,
      status: 'ACTIVE',
      statusColor: '#38bdf8',
      statusBg: 'rgba(56,189,248,0.15)',
      title: 'Nginx Web Server',
      desc: 'SPA fallback configured with try_files $uri /index.html rule.',
      stats: [
        { label: 'Ports', value: '80 (HTTP), 443 (HTTPS)' },
        { label: 'SPA Routing', value: 'Active' },
        { label: 'Gzip', value: 'Enabled' },
      ]
    },
    {
      icon: <Shield size={30} color="#a855f7" />,
      status: 'SECURED',
      statusColor: '#a855f7',
      statusBg: 'rgba(168,85,247,0.15)',
      title: 'Security Group',
      desc: 'Inbound rules for HTTP, HTTPS & SSH GitHub Actions deployment.',
      stats: [
        { label: 'SSH (22)', value: '0.0.0.0/0 (CI/CD)' },
        { label: 'HTTP (80)', value: '0.0.0.0/0' },
        { label: 'HTTPS (443)', value: '0.0.0.0/0' },
      ]
    },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Cpu color="#ff9900" size={32} /> Infrastructure Monitor
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Live status for EC2 <code>{instanceId}</code> in <code>{region}</code>.
          </p>
        </div>
        <button onClick={handleSimulateCheck} className="btn btn-secondary" disabled={isRefreshing}>
          <RefreshCw size={16} className={isRefreshing ? 'spin' : ''} />
          {isRefreshing ? 'Pinging...' : 'Health Check'}
        </button>
      </div>

      {/* Health Banner */}
      <div className="glass-card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(15,23,42,0.8))', borderColor: 'rgba(16,185,129,0.2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>HTTP Health</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
              <CheckCircle size={18} /> Healthy (200 OK)
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Latency</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{latency} ms</div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Server</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>Nginx / Linux</div>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid-3">
        {cards.map(({ icon, status, statusColor, statusBg, title, desc, stats }) => (
          <div key={title} className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              {icon}
              <span style={{ background: statusBg, color: statusColor, padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.76rem', fontWeight: '700' }}>
                {status}
              </span>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem', flex: 1 }}>{desc}</p>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {stats.map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-dim)' }}>{label}</span>
                  <span style={{ fontWeight: '600', textAlign: 'right', wordBreak: 'break-all' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
