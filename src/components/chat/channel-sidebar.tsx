'use client'

import { useState } from 'react'
import { CreateChannelDialog } from './create-channel-dialog'
import { Button } from '@/components/ui/button'

type Channel = {
  id: string
  name: string
  createdAt: Date
}

type Props = {
  channels: Channel[]
  selectedId: string | null
  onSelect: (id: string) => void
  onChannelCreated: (channel: Channel) => void
}

export function ChannelSidebar({ channels, selectedId, onSelect, onChannelCreated }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <aside className="flex w-64 flex-col border-r bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Channels
        </span>
      </div>
      <ul className="flex-1 overflow-y-auto py-2 list-none">
        {channels.length === 0 ? (
          <li className="px-4 py-2 text-sm text-muted-foreground">チャンネルがありません</li>
        ) : (
          channels.map((channel) => (
            <li key={channel.id}>
              <button
                type="button"
                onClick={() => onSelect(channel.id)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-accent ${
                  selectedId === channel.id
                    ? 'border-l-2 border-primary bg-primary/10 font-medium text-primary'
                    : 'border-l-2 border-transparent text-foreground'
                }`}
              >
                # {channel.name}
              </button>
            </li>
          ))
        )}
      </ul>
      <div className="border-t p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => setDialogOpen(true)}
        >
          <span className="text-base leading-none">+</span>
          New Channel
        </Button>
      </div>
      <CreateChannelDialog open={dialogOpen} onOpenChange={setDialogOpen} onChannelCreated={onChannelCreated} />
    </aside>
  )
}
