import React from 'react'
import { Cpu, ShieldCheck } from 'lucide-react'

export default function Footer() {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'AWS React App'
  
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
          <Cpu size={18} color="#ff9900" />
          <span>{appTitle}</span>
          <span style={{ color: 'var(--text-dim)', margin: '0 0.5rem' }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} /> AWS Static Hosting Ready
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
          Built with React 18, Vite & React Router • Designed for AWS EC2, S3 + CloudFront & AWS Amplify Static Deployments.
        </p>
      </div>
    </footer>
  )
}
