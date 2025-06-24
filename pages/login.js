import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    setMessage(error ? error.message : 'Erfolgreich eingeloggt')
  }

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    setMessage(error ? error.message : 'Erfolgreich registriert')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login / Registrierung</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input placeholder="Passwort" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister} style={{ marginLeft: '1rem' }}>Registrieren</button>
      <p>{message}</p>
    </div>
  )
}
