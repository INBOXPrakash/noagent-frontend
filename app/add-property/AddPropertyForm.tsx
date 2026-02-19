'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AddPropertyForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [city, setCity] = useState('')
  const [msg, setMsg] = useState('')

  const submit = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) {
      setMsg('Please login first')
      return
    }

    if (!title || !description || !price || !city) {
      setMsg('All fields are required!')
      return
    }

    const { error } = await supabase.from('properties').insert([
      {
        owner_id: user.id, // change to user_id if that is your column
        title,
        description,
        city,
        price: Number(price),
        status: 'draft',
      },
    ])

    if (error) {
      setMsg(error.message)
    } else {
      setMsg('Property added successfully!')
      setTitle('')
      setDescription('')
      setPrice('')
      setCity('')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 450,
          width: '100%',
          padding: 30,
          border: '2px solid #000',
          borderRadius: 8,
          background: '#fff',
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Add Property
        </h2>

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 12 }}
        />

        <input
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 12 }}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 12 }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 12 }}
        />

        <button
          onClick={submit}
          style={{
            width: '100%',
            padding: 12,
            background: '#000',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Submit Property
        </button>

        <p style={{ marginTop: 12, color: 'red', fontWeight: 'bold' }}>
          {msg}
        </p>
      </div>
    </div>
  )
}
