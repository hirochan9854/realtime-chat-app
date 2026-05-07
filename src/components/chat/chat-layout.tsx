'use client'

import { useState } from 'react'
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
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)

  const selectedChannel = initialChannels.find((c) => c.id === selectedChannelId) ?? null

  return (
    <div className="flex flex-1 overflow-hidden">
      <ChannelSidebar
        initialChannels={initialChannels}
        selectedId={selectedChannelId}
        onSelect={setSelectedChannelId}
      />
      <MessageArea
        channelId={selectedChannelId}
        channelName={selectedChannel?.name ?? null}
        currentUser={currentUser}
      />
    </div>
  )
}
