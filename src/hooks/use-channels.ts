'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Channel = {
  id: string
  name: string
  createdAt: Date
}

type ChannelRow = { id: string; name: string; created_at: string }

export function useChannels(initialChannels: Channel[]) {
  const [channels, setChannels] = useState(initialChannels)

  const addChannel = (channel: Channel) => {
    setChannels((prev) => (prev.some((c) => c.id === channel.id) ? prev : [...prev, channel]))
  }

  useEffect(() => {
    const supabase = createClient()
    const subscription = supabase
      .channel('channels-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channels' },
        (payload: { new: ChannelRow }) => {
          const { id, name, created_at } = payload.new
          if (!id || !name) return
          setChannels((prev) =>
            prev.some((c) => c.id === id)
              ? prev
              : [...prev, { id, name, createdAt: new Date(created_at) }],
          )
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  return { channels, addChannel }
}
