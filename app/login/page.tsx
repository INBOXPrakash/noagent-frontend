'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirect') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  // Email + Password Login
  const loginWithEmail = async () => {
    setMsg('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMsg(error.message)
      return
    }

    router.push(redirectTo)
  }

  // Google Login
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${redirectTo}`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <button
          onClick={loginWithGoogle}
          className="w-full border py-2 mb-4 rounded"
        >
          Continue with Google
        </button>

        <div className="text-center text-gray-500 mb-4">OR</div>

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
          onClick={loginWithEmail}
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>

        {msg && <p className="text-red-500 mt-3">{msg}</p>}

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <a
            href={`/signup?redirect=${redirectTo}`}
            className="underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
