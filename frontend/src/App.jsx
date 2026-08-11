import { useEffect, useState } from 'react'
import './App.css'

const STAGES = ['Build', 'Test', 'Deploy', 'Live']

export default function App() {
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState('connecting') // connecting | ok | error

  useEffect(() => {
    let cancelled = false

    fetch('/api/hello')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setMessage(data.message)
        setStatus('ok')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const activeStage = status === 'ok' ? STAGES.length - 1 : status === 'error' ? 2 : 1

  return (
    <div className="page">
      <div className="card">
        <p className="eyebrow">melior · devsecops internship</p>
        <h1>Melior</h1>

        <div className="pipeline" role="img" aria-label={`Pipeline status: ${status}`}>
          {STAGES.map((stage, i) => (
            <div className="pipeline-stage" key={stage}>
              <div
                className={
                  'pipeline-dot' +
                  (i < activeStage ? ' is-done' : '') +
                  (i === activeStage && status === 'ok' ? ' is-live' : '') +
                  (i === activeStage && status === 'error' ? ' is-error' : '')
                }
              />
              <span className="pipeline-label">{stage}</span>
              {i < STAGES.length - 1 && <div className="pipeline-line" />}
            </div>
          ))}
        </div>

        <div className="message-box">
          {status === 'connecting' && <p className="message message--pending">Reaching the API…</p>}
          {status === 'ok' && <p className="message">{message}</p>}
          {status === 'error' && (
            <p className="message message--error">
              Couldn&rsquo;t reach <code>/api/hello</code>. Is gunicorn running?
            </p>
          )}
        </div>

        <p className="footnote">Flask · gunicorn · Azure App Service</p>
      </div>
    </div>
  )
}
