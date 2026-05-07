'use client'

import { useState } from 'react'
import { useChannels } from '@/hooks/use-channels'
import { CreateChannelDialog } from './create-channel-dialog'
import { Button } from '@/components/ui/button'

type Channel = {
  id: string
  name: string
  createdAt: Date
}

type Props = {
  initialChannels: Channel[]
}

export function ChannelSidebar({ initialChannels }: Props) {
  const channels = useChannels(initialChannels)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <aside className="flex w-64 flex-col border-r bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Channels
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {channels.length === 0 ? (
          <p className="px-4 py-2 text-sm text-muted-foreground">チャンネルがありません</p>
        ) : (
          channels.map((channel) => (
            <button
              key={channel.id}
              type="button"
              onClick={() => setSelectedId(channel.id)}
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-accent ${
                selectedId === channel.id
                  ? 'border-l-2 border-primary bg-primary/10 font-medium text-primary'
                  : 'border-l-2 border-transparent text-foreground'
              }`}
            >
              # {channel.name}
            </button>
          ))
        )}
      </div>
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
      <CreateChannelDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </aside>
  )
}
