import React, { useState } from 'react'
import { Server, Database, Shield, Radio, CheckCircle, RefreshCw } from 'lucide-react'

export default function Services() {
  const [ec2State, setEc2State] = useState({
    status: 'running',
    publicIp: '54.210.12.88',
    instanceType: 't3.micro',
    uptime: '14 days 6 hours'
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleSimulateCheck = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 800)
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Server color="#ff9900" size={32} /> Simulated AWS Infrastructure
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Sample status cards demonstrating how your React SPA interacts with AWS resources.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={handleSimulateCheck} className="btn btn-secondary" disabled={isRefreshing}>
          <RefreshCw size={16} className={isRefreshing ? 'spin' : ''} />
          {isRefreshing ? 'Refreshing Status...' : 'Simulate Health Check'}
        </button>
      </div>

      <div className="grid-3">
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <Server size={32} color="#ff9900" />
            <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
              {ec2State.status.toUpperCase()}
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>EC2 Instance</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Testing target server for static React application build outputs.
          </p>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
            <div><strong>Type:</strong> {ec2State.instanceType}</div>
            <div><strong>Public IP:</strong> {ec2State.publicIp}</div>
            <div><strong>Uptime:</strong> {ec2State.uptime}</div>
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <Radio size={32} color="#06b6d4" />
            <span style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
              ACTIVE
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>S3 Bucket + CloudFront</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Global edge CDN static asset caching distribution bucket.
          </p>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
            <div><strong>Bucket:</strong> aws-ec2-testing-assets</div>
            <div><strong>SSL Cert:</strong> ACM Active</div>
            <div><strong>Cache Hit Rate:</strong> 99.4%</div>
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <Shield size={32} color="#8b5cf6" />
            <span style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
              SECURED
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Security Group</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Inbound rules configured for HTTP (80) & HTTPS (443) traffic.
          </p>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
            <div><strong>Group ID:</strong> sg-0a9b8c7d6e5f</div>
            <div><strong>Inbound:</strong> Port 80, Port 443</div>
            <div><strong>SSH Port 22:</strong> Restricted</div>
          </div>
        </div>
      </div>
    </div>
  )
}
