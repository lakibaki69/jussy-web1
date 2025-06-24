import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>JUSSY – Deine Plattform</h1>
      <p>Login/Register sowie Inserate folgen…</p>
    </div>
  )
}
