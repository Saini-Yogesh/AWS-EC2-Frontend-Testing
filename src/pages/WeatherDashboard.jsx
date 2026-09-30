import React, { useState, useEffect } from 'react'
import { CloudSun, Thermometer, Wind, Compass, MapPin, Loader2, Globe, Shield } from 'lucide-react'

const CITIES = [
  { name: 'London', lat: 51.5074, lon: -0.1278, country: 'UK' },
  { name: 'New York', lat: 40.7128, lon: -74.0060, country: 'USA' },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, country: 'Japan' },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, country: 'Australia' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, country: 'India' },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194, country: 'USA' },
]

export default function WeatherDashboard() {
  const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL || 'https://api.open-meteo.com/v1/forecast'
  const ipGeoApiUrl = import.meta.env.VITE_IP_GEO_API_URL || 'https://ipapi.co/json'

  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [weather, setWeather] = useState(null)
  const [ipData, setIpData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchWeather = async (city) => {
    setLoading(true)
    try {
      const url = `${weatherApiUrl}?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
      const res = await fetch(url)
      if (res.ok) setWeather((await res.json()).current_weather)
    } catch (err) {
      console.error('Weather API error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchIpTelemetry = async () => {
    try {
      const res = await fetch(ipGeoApiUrl)
      if (res.ok) setIpData(await res.json())
    } catch (err) {
      console.error('IP Geo API error:', err)
    }
  }

  useEffect(() => {
    fetchWeather(selectedCity)
    fetchIpTelemetry()
  }, [selectedCity])

  const getWeatherInfo = (code) => {
    if (code === 0) return { label: 'Clear Sky ☀️', color: '#f59e0b' }
    if (code >= 1 && code <= 3) return { label: 'Partly Cloudy ⛅', color: '#38bdf8' }
    if (code >= 51 && code <= 67) return { label: 'Rainy 🌧️', color: '#3b82f6' }
    if (code >= 71 && code <= 77) return { label: 'Snowy ❄️', color: '#a855f7' }
    return { label: 'Overcast 🌤️', color: '#10b981' }
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <CloudSun color="#ff9900" size={32} /> Live Weather & Client Telemetry
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', wordBreak: 'break-all' }}>
          Real-time weather via Open-Meteo API • <code style={{ fontSize: '0.82rem' }}>{weatherApiUrl}</code>
        </p>
      </div>

      {/* City Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {CITIES.map((city) => (
          <button
            key={city.name}
            onClick={() => setSelectedCity(city)}
            className={`btn ${selectedCity.name === city.name ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem', gap: '0.35rem' }}
          >
            <MapPin size={13} /> {city.name}
          </button>
        ))}
      </div>

      {/* Weather Card */}
      {loading ? (
        <div style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--accent-cyan)' }}>
          <Loader2 size={40} className="spin" style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '1.05rem', fontWeight: '600' }}>Fetching weather for {selectedCity.name}...</p>
        </div>
      ) : weather ? (
        <div className="glass-card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(15,23,42,0.9))', borderColor: 'rgba(56,189,248,0.25)' }}>
          {/* City Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: '700', marginBottom: '0.75rem' }}>
            <MapPin size={18} /> {selectedCity.name}, {selectedCity.country}
          </div>

          {/* Temp + Condition Row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            <div className="temp-large">{weather.temperature}°C</div>
            <span style={{ 
              display: 'inline-flex', padding: '0.35rem 1rem', borderRadius: '20px',
              background: 'rgba(255,255,255,0.08)', fontWeight: '700', fontSize: '1rem',
              color: getWeatherInfo(weather.weathercode).color, marginBottom: '0.5rem'
            }}>
              {getWeatherInfo(weather.weathercode).label}
            </span>
          </div>

          {/* Stats Row */}
          <div className="weather-stats-grid">
            <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', alignItems: 'center' }}>
              <Wind size={22} color="#38bdf8" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Wind Speed</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{weather.windspeed} km/h</div>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', alignItems: 'center' }}>
              <Compass size={22} color="#ff9900" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Direction</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{weather.winddirection}°</div>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', alignItems: 'center' }}>
              <Globe size={22} color="#10b981" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Coordinates</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>{selectedCity.lat}, {selectedCity.lon}</div>
            </div>
          </div>
        </div>
      ) : null}

      {/* IP Telemetry */}
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)' }}>
          <Shield size={20} /> Visitor Connection Telemetry
        </h2>
        <div className="glass-card">
          {ipData ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Public IP Address</span>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '1rem', marginTop: '0.25rem', wordBreak: 'break-all' }}>
                  {ipData.ip || 'AWS Cloud Edge'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>City / Country</span>
                <div style={{ fontWeight: '700', marginTop: '0.25rem' }}>
                  {ipData.city ? `${ipData.city}, ${ipData.country_name}` : 'Edge Network'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>ISP / Org</span>
                <div style={{ color: 'var(--accent-emerald)', fontWeight: '700', marginTop: '0.25rem', wordBreak: 'break-word' }}>
                  {ipData.org || 'Internet Gateway'}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Loader2 size={16} className="spin" /> Detecting visitor IP & network...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
