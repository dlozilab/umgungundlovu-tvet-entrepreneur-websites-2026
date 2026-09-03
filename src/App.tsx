import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

type Status = 'checking' | 'connected' | 'failed'

export default function App() {
  const [status, setStatus] = useState<Status>('checking')
  const [detail, setDetail] = useState('')

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ error }) => {
        if (error) {
          setStatus('failed')
          setDetail(error.message)
        } else {
          setStatus('connected')
          setDetail(import.meta.env.VITE_SUPABASE_URL)
        }
      })
      .catch((e: Error) => {
        setStatus('failed')
        setDetail(e.message)
      })
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui', padding: 32 }}>
      <h1>Supabase connection</h1>
      <p>Status: {status}</p>
      {detail && <p style={{ color: '#666' }}>{detail}</p>}
    </main>
  )
}