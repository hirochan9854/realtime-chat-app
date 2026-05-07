'use client'

import { useRef, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  onSend: (content: string) => Promise<void>
  disabled?: boolean
}

export function MessageInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || isPending) return
    setValue('')
    startTransition(async () => {
      await onSend(trimmed)
      inputRef.current?.focus()
    })
  }

  return (
    <div className="flex gap-2 border-t p-3">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        placeholder="メッセージを入力... (Enter で送信)"
        disabled={isPending || disabled}
        className="flex-1"
      />
      <Button onClick={handleSend} disabled={isPending || disabled || !value.trim()} size="sm">
        送信
      </Button>
    </div>
  )
}
