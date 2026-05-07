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

  useEffect(() => {
    const supabase = createClient()
    const subscription = supabase
      .channel('channels-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channels' },
        (payload: { new: ChannelRow }) => {
          setChannels((prev) => [
            ...prev,
            { id: payload.new.id, name: payload.new.name, createdAt: new Date(payload.new.created_at) },
          ])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  return channels
}
