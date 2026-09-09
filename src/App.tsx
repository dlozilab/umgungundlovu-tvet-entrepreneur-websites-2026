import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import { loadSite } from './features/siteSlice'

export default function App() {
  const dispatch = useAppDispatch()
  const { status, data, error } = useAppSelector((s) => s.site)

  useEffect(() => {
    dispatch(loadSite('demo-fabrication'))
  }, [dispatch])

  return (
    <main style={{ fontFamily: 'system-ui', padding: 32 }}>
      <h1>Store test</h1>
      <p>Status: {status}</p>
      {error && <p style={{ color: '#a3312a' }}>{error}</p>}
      {data && <pre style={{ background: '#f5f5f4', padding: 16 }}>{JSON.stringify(data, null, 2)}</pre>}
    </main>
  )
}