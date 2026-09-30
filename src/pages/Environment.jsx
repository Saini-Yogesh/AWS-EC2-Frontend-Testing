import React, { useState } from 'react'
import { Key, Copy, Check, ShieldAlert, PlusCircle, Info } from 'lucide-react'

export default function Environment() {
  const [copiedKey, setCopiedKey] = useState(null)
  const [customVars, setCustomVars] = useState([])
  const [newKey, setNewKey] = useState('')
  const [newVal, setNewVal] = useState('')

  const envVars = Object.entries(import.meta.env)
    .filter(([key]) => key.startsWith('VITE_'))
    .map(([key, value]) => ({ key, value }))

  const handleCopy = (text, keyName) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(keyName)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleAddCustom = (e) => {
    e.preventDefault()
    if (!newKey.trim()) return
    const formattedKey = newKey.trim().startsWith('VITE_') ? newKey.trim() : `VITE_${newKey.trim().toUpperCase()}`
    setCustomVars([...customVars, { key: formattedKey, value: newVal.trim() || 'test-value' }])
    setNewKey('')
    setNewVal('')
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Key color="#ff9900" size={30} /> Active Environment Variables
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Inspecting build-time variables injected into Vite via <code>import.meta.env</code>.
        </p>
      </div>

      {/* Env Table */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.75rem', overflowX: 'auto' }}>
        <h2 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: '#ff9900' }}>
          Detected Variables ({envVars.length + customVars.length})
        </h2>

        {envVars.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
            No <code>VITE_</code> variables detected.
          </p>
        ) : (
          <table className="env-table" style={{ minWidth: '500px' }}>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Value</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {envVars.map(({ key, value }) => (
                <tr key={key}>
                  <td className="env-key" style={{ wordBreak: 'break-all' }}>{key}</td>
                  <td><span className="env-val" style={{ wordBreak: 'break-all' }}>{String(value)}</span></td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>import.meta.env</td>
                  <td>
                    <button onClick={() => handleCopy(String(value), key)} className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}>
                      {copiedKey === key ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                      {copiedKey === key ? 'Copied' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
              {customVars.map(({ key, value }, idx) => (
                <tr key={`c-${idx}`} style={{ background: 'rgba(255,153,0,0.04)' }}>
                  <td className="env-key" style={{ wordBreak: 'break-all' }}>
                    {key} <span style={{ fontSize: '0.7rem', background: 'var(--accent-orange)', color: '#000', padding: '0.1rem 0.35rem', borderRadius: '4px', marginLeft: '0.35rem', fontWeight: '700' }}>TEST</span>
                  </td>
                  <td><span className="env-val">{String(value)}</span></td>
                  <td style={{ color: 'var(--accent-orange)', fontSize: '0.82rem' }}>UI Test</td>
                  <td>
                    <button onClick={() => handleCopy(String(value), key)} className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}>
                      {copiedKey === key ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                      {copiedKey === key ? 'Copied' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Two-col section */}
      <div className="grid-2" style={{ marginTop: '0' }}>
        {/* Test Form */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
            <PlusCircle size={18} /> Test Dynamic Variable
          </h3>
          <form onSubmit={handleAddCustom} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>
                Key Name (<code>VITE_</code> auto-applied)
              </label>
              <input type="text" placeholder="MY_CUSTOM_KEY" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="input-field" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>Value</label>
              <input type="text" placeholder="test-value-123" value={newVal} onChange={(e) => setNewVal(e.target.value)} className="input-field" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              Add Test Variable to Table
            </button>
          </form>
        </div>

        {/* AWS Tip */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff9900' }}>
            <ShieldAlert size={18} /> AWS Deployment Tip
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '1rem' }}>
            In React/Vite, environment variables are embedded into the static JS bundle at <strong>build time</strong>.
            They are not available at runtime like server-side variables.
          </p>
          <div style={{ padding: '1rem', background: 'rgba(255,153,0,0.08)', borderRadius: '10px', borderLeft: '3px solid #ff9900', fontSize: '0.85rem', lineHeight: '1.65' }}>
            <strong>AWS Amplify or EC2 Build:</strong><br/>
            Set environment variables in your build environment before running <code>npm run build</code>.
            On EC2, configure <code>~/AWS-EC2-Testing/.env</code> directly on the server.
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.85rem', background: 'rgba(16,185,129,0.08)', borderRadius: '10px', borderLeft: '3px solid var(--accent-emerald)', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
            <Info size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>Never put secrets (DB passwords, private API keys) inside <code>VITE_*</code> variables as they are publicly visible in browser JS bundles.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
