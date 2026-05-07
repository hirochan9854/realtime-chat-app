'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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

const schema = z.object({
  name: z.string().min(1, 'チャンネル名を入力してください').max(50, '50文字以内で入力してください'),
})

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateChannelDialog({ open, onOpenChange }: Props) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  })

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await createChannel(values.name)
      if (result.error) {
        form.setError('name', { message: result.error })
        return
      }
      form.reset()
      onOpenChange(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>新しいチャンネルを作成</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channel-name">チャンネル名</Label>
            <Input
              id="channel-name"
              placeholder="general"
              {...form.register('name')}
              disabled={isPending}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? '作成中...' : '作成'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
