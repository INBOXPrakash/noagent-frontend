'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const signup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMsg(error.message)
      return
    }

    setMsg('Signup successful. Please check your email.')
    router.push(redirectTo)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="bg-black text-white w-full py-2 rounded"
        >
          Create Account
        </button>

        {msg && <p className="text-green-600 mt-3">{msg}</p>}
      </div>
    </div>
  )
}
