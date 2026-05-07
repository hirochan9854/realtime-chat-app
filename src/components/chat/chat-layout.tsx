'use client'

import { useState } from 'react'
import { useChannels } from '@/hooks/use-channels'
import { ChannelSidebar } from './channel-sidebar'
import { MessageArea } from './message-area'

type Channel = {
  id: string
  name: string
  createdAt: Date
}

type CurrentUser = { id: string; username: string }

type Props = {
  initialChannels: Channel[]
  currentUser: CurrentUser
}

export function ChatLayout({ initialChannels, currentUser }: Props) {
  const { channels, addChannel } = useChannels(initialChannels)
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)

  const selectedChannel = channels.find((c) => c.id === selectedChannelId) ?? null

  return (
    <div className="flex flex-1 overflow-hidden">
      <ChannelSidebar
        channels={channels}
        selectedId={selectedChannelId}
        onSelect={setSelectedChannelId}
        onChannelCreated={addChannel}
      />
      <MessageArea
        channelId={selectedChannelId}
        channelName={selectedChannel?.name ?? null}
        currentUser={currentUser}
      />
    </div>
  )
}
