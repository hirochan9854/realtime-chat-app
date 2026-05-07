'use client'

import { useMessages } from '@/hooks/use-messages'
import { MessageInput } from './message-input'
import { MessageList } from './message-list'

type CurrentUser = { id: string; username: string }

type Props = {
  channelId: string | null
  channelName: string | null
  currentUser: CurrentUser
}

export function MessageArea({ channelId, channelName, currentUser }: Props) {
  const { messages, send, isLoading } = useMessages(channelId, currentUser)

  if (!channelId) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">チャンネルを選択してください</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shrink-0 border-b px-4 py-3">
        <span className="font-semibold"># {channelName}</span>
      </div>
      <MessageList messages={messages} currentUserId={currentUser.id} isLoading={isLoading} />
      <MessageInput onSend={send} />
    </div>
  )
}
