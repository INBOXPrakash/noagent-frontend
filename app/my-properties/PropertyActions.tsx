'use client'

import { supabase } from '@/lib/supabaseClient'

export default function PropertyActions({
  id,
  status,
}: {
  id: string
  status: string
}) {
  const updateStatus = async (newStatus: string) => {
    await supabase
      .from('properties')
      .update({ status: newStatus })
      .eq('id', id)
  }

  return (
    <div style={{ marginTop: 10 }}>
      {status === 'draft' && (
        <button onClick={() => updateStatus('published')}>
          Publish
        </button>
      )}

      {status !== 'archived' && (
        <button onClick={() => updateStatus('archived')}>
          Archive
        </button>
      )}
    </div>
  )
}
