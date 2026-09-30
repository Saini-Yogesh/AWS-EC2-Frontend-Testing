import React, { useState } from 'react'
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setSubmitted(true)
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: '800', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Mail color="#ff9900" size={30} /> Contact & Feedback
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Test client-side interactive form handling on this static React deployment.
        </p>
      </div>

      <div className="glass-card">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <CheckCircle2 size={52} color="#10b981" style={{ margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Submitted!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Thanks, {formData.name}! Since this is a static site, your input was handled fully client-side.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }) }}
              className="btn btn-secondary"
            >
              <MessageSquare size={16} /> Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.45rem', fontWeight: '600' }}>
                  Your Name
                </label>
                <input
                  type="text" required placeholder="AWS Administrator"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.45rem', fontWeight: '600' }}>
                  Email Address
                </label>
                <input
                  type="email" required placeholder="admin@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.45rem', fontWeight: '600' }}>
                Message / Test Notes
              </label>
              <textarea
                rows={5} placeholder="Testing static website routing and deployment on AWS EC2..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: '100%', padding: '0.85rem 1.1rem', borderRadius: '14px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.95rem', resize: 'vertical', fontFamily: 'var(--font-sans)', outline: 'none' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
              <Send size={18} /> Submit Test Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
