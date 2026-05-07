'use client'

import { useEffect, useOptimistic, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  fetchMessageById,
  fetchMessages,
  sendMessage,
  type MessageWithUser,
} from '@/app/actions/messages'

type CurrentUser = { id: string; username: string }

export function useMessages(channelId: string | null, currentUser: CurrentUser) {
  const [messages, setMessages] = useState<MessageWithUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMsg: MessageWithUser) => [...state, newMsg],
  )

  useEffect(() => {
    if (!channelId) {
      setMessages([])
      return
    }
    setIsLoading(true)
    fetchMessages(channelId).then((r) => {
      if (!r.error && r.messages) setMessages(r.messages)
      setIsLoading(false)
    })
  }, [channelId])

  useEffect(() => {
    if (!channelId) return
    const supabase = createClient()
    const subscription = supabase
      .channel(`messages-${channelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`,
        },
        async (payload: { new: { id: string } }) => {
          const msgId = payload.new.id
          if (!msgId) return
          const fetched = await fetchMessageById(msgId).then((r) => r.message)
          if (fetched) {
            setMessages((prev) => (prev.some((m) => m.id === msgId) ? prev : [...prev, fetched]))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [channelId])

  const send = async (content: string, imageUrl?: string): Promise<{ error?: string }> => {
    if (!channelId) return {}
    addOptimisticMessage({
      id: `temp-${Date.now()}`,
      content: content.trim() || null,
      imageUrl: imageUrl ?? null,
      channelId,
      userId: currentUser.id,
      createdAt: new Date(),
      user: { username: currentUser.username },
    })

    const r = await sendMessage(channelId, content, imageUrl)
    if (r.error) return { error: r.error }
    if (r.message) {
      const confirmed = r.message
      setMessages((prev) => (prev.some((m) => m.id === confirmed.id) ? prev : [...prev, confirmed]))
    }
    return {}
  }

  return { messages: optimisticMessages, send, isLoading }
}
