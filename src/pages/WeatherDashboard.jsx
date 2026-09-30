import React, { useState, useEffect } from 'react'
import { CloudSun, Thermometer, Wind, Compass, MapPin, Loader2, RefreshCw, Globe, Shield } from 'lucide-react'

const CITIES = [
  { name: 'London', lat: 51.5074, lon: -0.1278, country: 'United Kingdom' },
  { name: 'New York', lat: 40.7128, lon: -74.0060, country: 'United States' },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, country: 'Japan' },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, country: 'Australia' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, country: 'India' },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194, country: 'United States' },
]

export default function WeatherDashboard() {
  const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL || 'https://api.open-meteo.com/v1/forecast'
  const ipGeoApiUrl = import.meta.env.VITE_IP_GEO_API_URL || 'https://ipapi.co/json'

  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [weather, setWeather] = useState(null)
  const [ipData, setIpData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch weather data for selected city
  const fetchWeather = async (city) => {
    setLoading(true)
    try {
      const url = `${weatherApiUrl}?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setWeather(data.current_weather)
      }
    } catch (err) {
      console.error('Weather API error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch client IP telemetry
  const fetchIpTelemetry = async () => {
    try {
      const res = await fetch(ipGeoApiUrl)
      if (res.ok) {
        const data = await res.json()
        setIpData(data)
      }
    } catch (err) {
      console.error('IP Geo API error:', err)
    }
  }

  useEffect(() => {
    fetchWeather(selectedCity)
    fetchIpTelemetry()
  }, [selectedCity])

  const getWeatherInterpretation = (code) => {
    if (code === 0) return { label: 'Clear Sky ☀️', color: '#f59e0b' }
    if (code >= 1 && code <= 3) return { label: 'Partly Cloudy ⛅', color: '#38bdf8' }
    if (code >= 51 && code <= 67) return { label: 'Rainy 🌧️', color: '#3b82f6' }
    if (code >= 71 && code <= 77) return { label: 'Snowy ❄️', color: '#a855f7' }
    return { label: 'Overcast / Atmospheric 🌤️', color: '#10b981' }
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CloudSun color="#ff9900" size={32} /> Live Weather & Client Telemetry
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Real-time weather data via Open-Meteo (<code>{weatherApiUrl}</code>) & IP Geolocation.
        </p>
      </div>

      {/* City Selector Pills */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {CITIES.map((city) => (
          <button
            key={city.name}
            onClick={() => setSelectedCity(city)}
            className={`btn ${selectedCity.name === city.name ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          >
            <MapPin size={15} /> {city.name}
          </button>
        ))}
      </div>

      {/* Main Weather Card */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--accent-cyan)' }}>
          <Loader2 size={40} className="spin" style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Fetching weather data for {selectedCity.name}...</p>
        </div>
      ) : weather ? (
        <div className="weather-hero-card">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <MapPin size={18} /> {selectedCity.name}, {selectedCity.country}
            </div>
            <div className="temp-large">{weather.temperature}°C</div>
            <div style={{ marginTop: '0.75rem', display: 'inline-flex', padding: '0.35rem 0.85rem', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.08)', fontWeight: '700', color: getWeatherInterpretation(weather.weathercode).color }}>
              {getWeatherInterpretation(weather.weathercode).label}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.25rem', width: '100%', maxWidth: '480px' }}>
            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <Wind size={22} color="#38bdf8" style={{ margin: '0 auto 0.35rem' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Wind Speed</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{weather.windspeed} km/h</div>
            </div>

            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <Compass size={22} color="#ff9900" style={{ margin: '0 auto 0.35rem' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Wind Direction</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{weather.winddirection}°</div>
            </div>

            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <Globe size={22} color="#10b981" style={{ margin: '0 auto 0.35rem' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Coordinates</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{selectedCity.lat}, {selectedCity.lon}</div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Live IP Telemetry Section */}
      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-orange)' }}>
          <Shield size={20} /> Visitor Connection Telemetry
        </h2>

        <div className="glass-card">
          {ipData ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Public IP Address</span>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '1.1rem' }}>
                  {ipData.ip || ipData.network || 'Detected via Edge'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>City / Region</span>
                <div style={{ fontWeight: '700' }}>{ipData.city ? `${ipData.city}, ${ipData.country_name}` : 'AWS Cloud Edge'}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>ISP / Organization</span>
                <div style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>{ipData.org || 'Internet Gateway'}</div>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Loader2 size={16} className="spin" /> Detecting visitor IP & network route...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
