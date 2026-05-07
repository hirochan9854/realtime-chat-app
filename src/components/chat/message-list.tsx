'use client'

import { useEffect, useRef } from 'react'
import type { MessageWithUser } from '@/app/actions/messages'
import { MessageItem } from './message-item'

type Props = {
  messages: MessageWithUser[]
  currentUserId: string
  isLoading: boolean
}

export function MessageList({ messages, currentUserId, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: messages triggers scroll, not used inside body
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground animate-pulse">読み込み中...</p>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">まだメッセージがありません。最初のメッセージを送ってみよう！</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isOwn={message.userId === currentUserId}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
