import React, { useState } from 'react'
import { Mail, Send, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setSubmitted(true)
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <Mail color="#ff9900" size={32} /> Contact & Feedback
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Test client-side interactive form handling on your static React app.
        </p>
      </div>

      <div className="glass-card">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Submitted Successfully!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Thank you, {formData.name}. Since this is a static client-side demo, your input was processed locally.
            </p>
            <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }} className="btn btn-secondary">
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '500' }}>Your Name</label>
              <input
                type="text"
                required
                placeholder="AWS Administrator"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '500' }}>Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '500' }}>Message / Test Notes</label>
              <textarea
                rows={4}
                placeholder="Testing static website routing and deployment on AWS EC2..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.95rem', resize: 'vertical' }}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              <Send size={18} /> Submit Test Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
