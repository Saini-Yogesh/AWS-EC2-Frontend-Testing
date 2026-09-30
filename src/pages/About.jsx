import React from 'react'
import { Server, Cpu, Globe, ArrowRight, Code } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          About This Project
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Static Single Page Application (SPA) architecture engineered for AWS cloud testing.
        </p>
      </div>

      <div className="grid-2">
        <div className="glass-card">
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff9900' }}>
            <Server size={22} /> Deployment Modes
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDrection: 'column', gap: '0.85rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <strong style={{ color: 'var(--text-main)', minWidth: '130px' }}>AWS EC2:</strong>
              <span>Host the built <code>dist/</code> directory using Nginx, Apache, or Caddy web servers.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <strong style={{ color: 'var(--text-main)', minWidth: '130px' }}>AWS S3 + CloudFront:</strong>
              <span>Deploy to an S3 bucket with CloudFront CDN for edge distribution.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <strong style={{ color: 'var(--text-main)', minWidth: '130px' }}>AWS Amplify:</strong>
              <span>Connect directly to GitHub repo for continuous git push deployment.</span>
            </li>
          </ul>
        </div>

        <div className="glass-card">
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
            <Code size={22} /> Tech Stack Specifications
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['React 18', 'Vite 6', 'React Router v6', 'Lucide Icons', 'Vanilla CSS Custom Properties', 'Vite Env Ingestion'].map((tech, idx) => (
              <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid var(--border-color)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500' }}>
                {tech}
              </span>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/environment" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              View Environment Config <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Nginx Router Configuration Example for AWS EC2</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          When hosting React Router apps on EC2 with Nginx, ensure <code>try_files</code> redirects to <code>index.html</code> for static client-side routing:
        </p>
        <pre className="code-block">
{`server {
    listen 80;
    server_name _;
    root /var/www/html/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}`}
        </pre>
      </div>
    </div>
  )
}
