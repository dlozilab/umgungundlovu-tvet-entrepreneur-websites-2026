import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './lib/firebase'

type Status = 'checking' | 'connected' | 'failed'

export default function App() {
  const [status, setStatus] = useState<Status>('checking')
  const [detail, setDetail] = useState('')

  useEffect(() => {
    getDoc(doc(db, 'businesses', 'connection-test'))
      .then((snap) => {
        setStatus('connected')
        setDetail(snap.exists() ? 'Test document found' : 'Reached Firestore, no test document')
      })
      .catch((e: Error) => {
        setStatus('failed')
        setDetail(e.message)
      })
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui', padding: 32 }}>
      <h1>Firebase connection</h1>
      <p>Status: {status}</p>
      {detail && <p style={{ color: '#666' }}>{detail}</p>}
      <p style={{ color: '#666' }}>{import.meta.env.VITE_FIREBASE_PROJECT_ID}</p>
    </main>
  )
}