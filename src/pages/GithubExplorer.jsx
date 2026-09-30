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

  const fetchGithubData = async (userToFetch) => {
    setLoading(true)
    setError(null)
    try {
      // Fetch User Profile
      const userRes = await fetch(`${githubApiUrl}/users/${userToFetch}`)
      if (!userRes.ok) {
        if (userRes.status === 404) throw new Error(`User "${userToFetch}" not found on GitHub.`)
        throw new Error(`GitHub API Error (${userRes.status}): Rate limited or invalid request.`)
      }
      const userData = await userRes.json()
      setProfile(userData)

      // Fetch User Repos (sorted by updated)
      const reposRes = await fetch(`${githubApiUrl}/users/${userToFetch}/repos?sort=updated&per_page=6`)
      if (reposRes.ok) {
        const reposData = await reposRes.json()
        setRepos(Array.isArray(reposData) ? reposData : [])
      }
    } catch (err) {
      setError(err.message)
      setProfile(null)
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGithubData(username)
  }, [username])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setUsername(searchInput.trim())
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Github color="#ff9900" size={32} /> Live GitHub Profile Explorer
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Powered by live public GitHub API (<code>{githubApiUrl}</code>).
        </p>
      </div>

      {/* Search Input */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            className="input-field"
            placeholder="Search GitHub username (e.g. Saini-Yogesh, torvalds, gaearon)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <Search size={18} /> Search Profile
          </button>
        </form>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--accent-cyan)' }}>
          <Loader2 size={40} className="spin" style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Fetching live GitHub profile for "{username}"...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="glass-card" style={{ borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.08)', textAlign: 'center', padding: '2.5rem' }}>
          <AlertCircle size={40} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Unable to fetch GitHub User</h3>
          <p style={{ color: 'var(--text-muted)' }}>{error}</p>
        </div>
      )}

      {/* Profile & Repos Display */}
      {profile && !loading && (
        <div>
          {/* Main User Card */}
          <div className="github-profile-card">
            <img src={profile.avatar_url} alt={profile.login} className="avatar-img" />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{profile.name || profile.login}</h2>
                <a href={profile.html_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontWeight: '600' }}>
                  @{profile.login} <ExternalLink size={14} />
                </a>
              </div>

              {profile.bio && (
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1rem' }}>
                  {profile.bio}
                </p>
              )}

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {profile.location && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={16} color="#ff9900" /> {profile.location}
                  </span>
                )}
                {profile.blog && (
                  <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-cyan)' }}>
                    <LinkIcon size={16} /> {profile.blog}
                  </a>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Users size={16} color="#10b981" /> <strong>{profile.followers}</strong> followers • <strong>{profile.following}</strong> following
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <BookOpen size={16} color="#a855f7" /> <strong>{profile.public_repos}</strong> public repos
                </span>
              </div>
            </div>
          </div>

          {/* Repositories Section */}
          <div style={{ marginTop: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} color="#ff9900" /> Recent Public Repositories ({repos.length})
            </h3>

            <div className="grid-3">
              {repos.map((repo) => (
                <div key={repo.id} className="repo-card">
                  <div>
                    <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                      {repo.name} <ExternalLink size={14} />
                    </a>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', minHeight: '2.5rem' }}>
                      {repo.description || 'No description provided.'}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-dim)', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                    {repo.language && (
                      <span style={{ background: 'rgba(255, 153, 0, 0.12)', color: '#ff9900', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
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
        </div>
      )}
    </div>
  )
}
