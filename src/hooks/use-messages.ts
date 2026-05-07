'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!channelId) {
      setMessages([])
      return
    }
    fetchMessages(channelId).then((r) => {
      if (!r.error && r.messages) setMessages(r.messages)
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
        async (payload) => {
          const msgId = payload.new.id as string
          setMessages((prev) => {
            if (prev.some((m) => m.id === msgId)) return prev
            return prev
          })
          const r = await fetchMessageById(msgId)
          const fetched = r.message
          if (!r.error && fetched) {
            setMessages((prev) =>
              prev.some((m) => m.id === msgId) ? prev : [...prev, fetched],
            )
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [channelId])

  const send = async (content: string, imageUrl?: string) => {
    if (!channelId) return
    const tempId = `temp-${Date.now()}`
    const optimistic: MessageWithUser = {
      id: tempId,
      content: content.trim() || null,
      imageUrl: imageUrl ?? null,
      channelId,
      userId: currentUser.id,
      createdAt: new Date(),
      user: { username: currentUser.username },
    }
    setMessages((prev) => [...prev, optimistic])

    const r = await sendMessage(channelId, content, imageUrl)
    const confirmed = r.message
    if (r.error || !confirmed) {
      setMessages((prev) => prev.filter((m) => m.id !== tempId))
    } else {
      setMessages((prev) => prev.map((m) => (m.id === tempId ? confirmed : m)))
    }
  }

  return { messages, send }
}
