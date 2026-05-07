'use client'

import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createChannel } from '@/app/actions/channels'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type State = { error?: string; success?: boolean }

function CreateChannelForm({ onSuccess }: { onSuccess: () => void }) {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_prev, formData) => {
      const name = (formData.get('name') as string | null)?.trim() ?? ''
      return createChannel(name)
    },
    {},
  )

  useEffect(() => {
    if (state.success) onSuccess()
  }, [state.success, onSuccess])

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

export function CreateChannelDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>新しいチャンネルを作成</DialogTitle>
        </DialogHeader>
        {open && <CreateChannelForm onSuccess={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  )
}
