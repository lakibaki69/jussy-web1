import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import { getUserCredits, deductCredits } from '../utils/credits'

export default function CreateListing() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [credits, setCredits] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      const creditBalance = await getUserCredits(user.id)
      setCredits(creditBalance)
    }
    fetchUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (credits < 5) {
      alert("Nicht genug Credits!")
      return
    }

    const { data, error } = await supabase
      .from('listings')
      .insert([{ title, description, user_id: user.id }])

    if (!error) {
      await deductCredits(user.id, 5)
      alert("Inserat erfolgreich erstellt!")
      router.push('/dashboard')
    } else {
      alert("Fehler beim Erstellen")
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Neues Inserat</h1>
      <input
        className="w-full mb-2 p-2 border"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border"
        placeholder="Beschreibung"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-orange-500 text-white px-4 py-2 rounded" type="submit">
        Inserieren (5 Credits)
      </button>
    </form>
  )
}
