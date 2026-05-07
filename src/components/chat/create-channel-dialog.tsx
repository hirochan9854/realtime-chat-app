'use client'

import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createChannel } from '@/app/actions/channels'

type Channel = { id: string; name: string; createdAt: Date }

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onChannelCreated: (channel: Channel) => void
}

type State = { error?: string; channel?: Channel }

function CreateChannelForm({ onSuccess, onChannelCreated }: { onSuccess: () => void; onChannelCreated: (channel: Channel) => void }) {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_prev, formData) => {
      const name = (formData.get('name') as string | null)?.trim() ?? ''
      return createChannel(name)
    },
    {},
  )

  useEffect(() => {
    if (state.channel) {
      onChannelCreated(state.channel)
      onSuccess()
    }
  }, [state.channel, onSuccess, onChannelCreated])

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="channel-name">チャンネル名</Label>
        <Input
          id="channel-name"
          name="name"
          placeholder="general"
          maxLength={50}
          required
          disabled={isPending}
          autoFocus
        />
        {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? '作成中...' : '作成'}
        </Button>
      </div>
    </form>
  )
}

export function CreateChannelDialog({ open, onOpenChange, onChannelCreated }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>新しいチャンネルを作成</DialogTitle>
          <DialogDescription className="sr-only">チャンネル名を入力してください</DialogDescription>
        </DialogHeader>
        {open && <CreateChannelForm onSuccess={() => onOpenChange(false)} onChannelCreated={onChannelCreated} />}
      </DialogContent>
    </Dialog>
  )
}
