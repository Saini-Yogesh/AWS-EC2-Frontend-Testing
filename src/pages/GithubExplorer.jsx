import React, { useState, useEffect } from 'react'
import { Github, Search, Star, GitFork, Users, BookOpen, MapPin, Link as LinkIcon, ExternalLink, Loader2, AlertCircle } from 'lucide-react'

export default function GithubExplorer() {
  const defaultUser = import.meta.env.VITE_DEFAULT_GITHUB_USER || 'Saini-Yogesh'
  const githubApiUrl = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com'

  const [username, setUsername] = useState(defaultUser)
  const [searchInput, setSearchInput] = useState(defaultUser)
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchGithubData = async (user) => {
    setLoading(true)
    setError(null)
    try {
      const userRes = await fetch(`${githubApiUrl}/users/${user}`)
      if (!userRes.ok) {
        throw new Error(userRes.status === 404 ? `User "${user}" not found.` : `GitHub API Error (${userRes.status})`)
      }
      const userData = await userRes.json()
      setProfile(userData)
      const reposRes = await fetch(`${githubApiUrl}/users/${user}/repos?sort=updated&per_page=6`)
      if (reposRes.ok) setRepos(await reposRes.json())
    } catch (err) {
      setError(err.message)
      setProfile(null)
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchGithubData(username) }, [username])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) setUsername(searchInput.trim())
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Github color="#ff9900" size={32} /> Live GitHub Profile Explorer
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Powered by the public GitHub REST API — search any GitHub username.
        </p>
      </div>

      {/* Search */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search GitHub username (e.g. torvalds, gaearon)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ minWidth: '200px' }}
          />
          <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
            <Search size={16} /> Search
          </button>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--accent-cyan)' }}>
          <Loader2 size={40} className="spin" style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '1.05rem', fontWeight: '600' }}>Fetching profile for "{username}"...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="glass-card" style={{ borderColor: '#ef4444', background: 'rgba(239,68,68,0.08)', textAlign: 'center', padding: '2.5rem' }}>
          <AlertCircle size={40} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Unable to fetch profile</h3>
          <p style={{ color: 'var(--text-muted)' }}>{error}</p>
        </div>
      )}

      {/* Profile */}
      {profile && !loading && (
        <div>
          {/* User Card */}
          <div className="github-profile-card" style={{ marginBottom: '2.5rem' }}>
            <img src={profile.avatar_url} alt={profile.login} className="avatar-img" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: '800' }}>
                  {profile.name || profile.login}
                </h2>
                <a href={profile.html_url} target="_blank" rel="noreferrer"
                  style={{ color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontWeight: '600' }}>
                  @{profile.login} <ExternalLink size={14} />
                </a>
              </div>

              {profile.bio && (
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  {profile.bio}
                </p>
              )}

              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {profile.location && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={15} color="#ff9900" /> {profile.location}
                  </span>
                )}
                {profile.blog && (
                  <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                    target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-cyan)', wordBreak: 'break-all' }}>
                    <LinkIcon size={14} /> {profile.blog}
                  </a>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Users size={15} color="#10b981" /> <strong>{profile.followers}</strong> followers
                </span>
                <span><strong>{profile.following}</strong> following</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <BookOpen size={15} color="#a855f7" /> <strong>{profile.public_repos}</strong> repos
                </span>
              </div>
            </div>
          </div>

          {/* Repos Grid */}
          <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} color="#ff9900" /> Recent Repositories ({repos.length})
          </h3>

          <div className="grid-3">
            {repos.map((repo) => (
              <div key={repo.id} className="glass-card" style={{ padding: '1.5rem', gap: '0.75rem', justifyContent: 'space-between' }}>
                <div>
                  <a href={repo.html_url} target="_blank" rel="noreferrer"
                    style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem', wordBreak: 'break-word' }}>
                    {repo.name} <ExternalLink size={13} />
                  </a>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {repo.description || 'No description provided.'}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-dim)', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                  {repo.language && (
                    <span style={{ background: 'rgba(255,153,0,0.12)', color: '#ff9900', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                      {repo.language}
                    </span>
                  )}
                  <div style={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={13} color="#eab308" /> {repo.stargazers_count}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <GitFork size={13} color="#a855f7" /> {repo.forks_count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
