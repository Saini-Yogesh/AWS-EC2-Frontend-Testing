import React, { useState } from 'react'
import { Key, Copy, Check, Info, ShieldAlert, PlusCircle } from 'lucide-react'

export default function Environment() {
  const [copiedKey, setCopiedKey] = useState(null)
  
  // Extract all env variables starting with VITE_
  const envVars = Object.entries(import.meta.env)
    .filter(([key]) => key.startsWith('VITE_'))
    .map(([key, value]) => ({ key, value }))

  // Custom live env test state
  const [customVars, setCustomVars] = useState([])
  const [newKey, setNewKey] = useState('')
  const [newVal, setNewVal] = useState('')

  const handleCopy = (text, keyName) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(keyName)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleAddCustom = (e) => {
    e.preventDefault()
    if (!newKey.trim()) return
    const formattedKey = newKey.startsWith('VITE_') ? newKey.trim() : `VITE_${newKey.trim().toUpperCase()}`
    setCustomVars([...customVars, { key: formattedKey, value: newVal.trim() || 'active' }])
    setNewKey('')
    setNewVal('')
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Key color="#ff9900" size={32} /> Active Environment Variables
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Inspecting build-time variables injected into Vite (<code>import.meta.env</code>).
        </p>
      </div>

      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ff9900' }}>
          Detected Build Variables ({envVars.length})
        </h2>

        {envVars.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No variables starting with <code>VITE_</code> were detected.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="env-table">
              <thead>
                <tr>
                  <th>Variable Key</th>
                  <th>Value</th>
                  <th>Source</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {envVars.map(({ key, value }) => (
                  <tr key={key}>
                    <td className="env-key">{key}</td>
                    <td>
                      <span className="env-val">{String(value)}</span>
                    </td>
                    <td style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>import.meta.env</td>
                    <td>
                      <button
                        onClick={() => handleCopy(String(value), key)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        {copiedKey === key ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        {copiedKey === key ? 'Copied!' : 'Copy Value'}
                      </button>
                    </td>
                  </tr>
                ))}

                {customVars.map(({ key, value }, idx) => (
                  <tr key={`custom-${idx}`} style={{ background: 'rgba(255, 153, 0, 0.03)' }}>
                    <td className="env-key">{key} <span style={{ fontSize: '0.7rem', background: 'var(--accent-orange)', color: '#000', padding: '0.1rem 0.4rem', borderRadius: '4px', marginLeft: '0.4rem' }}>Interactive Test</span></td>
                    <td>
                      <span className="env-val">{String(value)}</span>
                    </td>
                    <td style={{ color: 'var(--accent-orange)', fontSize: '0.85rem' }}>User Input Test</td>
                    <td>
                      <button
                        onClick={() => handleCopy(String(value), key)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        {copiedKey === key ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        {copiedKey === key ? 'Copied!' : 'Copy'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid-2">
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={18} color="var(--accent-cyan)" /> Test Dynamic Variable Injection
          </h3>
          <form onSubmit={handleAddCustom} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Key Name (Prefix <code>VITE_</code> auto-applied if missing):
              </label>
              <input
                type="text"
                placeholder="MY_CUSTOM_TEST_KEY"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Value:
              </label>
              <input
                type="text"
                placeholder="test-value-123"
                value={newVal}
                onChange={(e) => setNewVal(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              Add Test Entry to UI Table
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)' }}>
            <ShieldAlert size={18} /> AWS Deployment Tip
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            In React static apps built with Vite, environment variables are embedded into static HTML/JS bundles at <strong>build time</strong>.
          </p>
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 153, 0, 0.08)', borderRadius: '8px', borderLeft: '3px solid #ff9900', fontSize: '0.85rem' }}>
            <strong>AWS Amplify / AWS EC2 Build Pipeline:</strong>
            <br />
            Set environment variables in AWS Amplify Console or pass them when running <code>VITE_AWS_REGION=us-west-2 npm run build</code> on EC2!
          </div>
        </div>
      </div>
    </div>
  )
}
