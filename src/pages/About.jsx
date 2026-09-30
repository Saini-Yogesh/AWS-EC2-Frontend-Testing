import React, { useState } from 'react'
import { Server, Code, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: '800', marginBottom: '0.5rem' }}>
          About This Project
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Static Single Page Application (SPA) built for AWS cloud hosting tests and DevOps practice.
        </p>
      </div>

      <div className="grid-2" style={{ marginTop: '0' }}>
        <div className="glass-card">
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff9900' }}>
            <Server size={20} /> Deployment Options
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            {[
              { label: 'AWS EC2', desc: 'Host the dist/ directory using Nginx or Apache on an Ubuntu instance.' },
              { label: 'S3 + CloudFront', desc: 'Upload to S3 bucket, distribute globally via CloudFront CDN.' },
              { label: 'AWS Amplify', desc: 'Connect GitHub repo for zero-config continuous deployment.' },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <strong style={{ color: 'var(--text-main)', minWidth: '100px', flexShrink: 0 }}>{label}:</strong>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
            <Code size={20} /> Tech Stack
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {['React 18', 'Vite 6', 'React Router v6', 'Lucide Icons', 'Vanilla CSS', 'Vite Env Injection', 'GitHub Actions CI/CD', 'Nginx SPA Rewrite'].map((tech) => (
              <span key={tech} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', padding: '0.35rem 0.8rem', borderRadius: '8px', fontSize: '0.83rem', fontWeight: '500' }}>
                {tech}
              </span>
            ))}
          </div>
          <Link to="/environment" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            View Env Variables <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Nginx SPA Config for AWS EC2</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Configure Nginx to serve the React SPA with client-side routing support:
        </p>
        <pre className="code-block">{`server {
    listen 80;
    server_name _;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}`}</pre>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>sudo nginx -t</code>
          <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>sudo systemctl reload nginx</code>
        </div>
      </div>
    </div>
  )
}
