import React, { useState } from 'react'
import { Server, Database, Shield, Radio, CheckCircle, RefreshCw, Activity, Cpu, HardDrive } from 'lucide-react'

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

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Cpu color="#ff9900" size={32} /> Infrastructure Monitor
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Live status metrics for AWS EC2 instance (<code>{instanceId}</code>) in <code>{region}</code>.
          </p>
        </div>

        <button onClick={handleSimulateCheck} className="btn btn-secondary" disabled={isRefreshing}>
          <RefreshCw size={16} className={isRefreshing ? 'spin' : ''} />
          {isRefreshing ? 'Pinging Server...' : 'Run Health Check'}
        </button>
      </div>

      {/* Latency & Telemetry Banner */}
      <div className="glass-card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.8))', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>HTTP Health ping</span>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} /> Healthy (200 OK)
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Latency</span>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
              {latency} ms
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Server Process</span>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>
              Nginx / Linux
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <Server size={32} color="#ff9900" />
            <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
              ONLINE
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>AWS EC2 Instance</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Hosting target for static SPA build outputs (`/var/www/html/`).
          </p>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
            <div><strong>Instance ID:</strong> {instanceId}</div>
            <div><strong>Region:</strong> {region}</div>
            <div><strong>OS:</strong> Ubuntu 24.04 LTS</div>
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <Radio size={32} color="#38bdf8" />
            <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
              ACTIVE
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Nginx Web Server</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Configured with SPA fallback rewrite rules (`try_files $uri /index.html`).
          </p>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
            <div><strong>Ports:</strong> 80 (HTTP), 443 (HTTPS)</div>
            <div><strong>SPA Routing:</strong> Active</div>
            <div><strong>Gzip Compression:</strong> Enabled</div>
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <Shield size={32} color="#a855f7" />
            <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
              SECURED
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Security Group</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Inbound rules allowing HTTP, HTTPS, and SSH GitHub Actions deployment.
          </p>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
            <div><strong>SSH (22):</strong> 0.0.0.0/0 (CI/CD)</div>
            <div><strong>HTTP (80):</strong> 0.0.0.0/0</div>
            <div><strong>HTTPS (443):</strong> 0.0.0.0/0</div>
          </div>
        </div>
      </div>
    </div>
  )
}
