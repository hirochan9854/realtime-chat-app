'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Channel = {
  id: string
  name: string
  createdAt: Date
}

export function useChannels(initialChannels: Channel[]) {
  const [channels, setChannels] = useState(initialChannels)

  useEffect(() => {
    const supabase = createClient()
    const subscription = supabase
      .channel('channels-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channels' },
        (payload) => {
          const newChannel = payload.new as Channel
          setChannels((prev) => [...prev, newChannel])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  return channels
}
