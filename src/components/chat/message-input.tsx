'use client'

import { useRef, useState, useTransition } from 'react'
import { Loader2, Paperclip } from 'lucide-react'
import { uploadChatImage } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  onSend: (content: string, imageUrl?: string) => Promise<{ error?: string }>
  disabled?: boolean
}

export function MessageInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')
  const [isPending, startTransition] = useTransition()
  const [uploading, setUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isBlocked = isPending || uploading || disabled

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || isBlocked) return
    setValue('')
    setErrorMessage(null)
    startTransition(async () => {
      const r = await onSend(trimmed)
      if (r.error) setErrorMessage(r.error)
      inputRef.current?.focus()
    })
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErrorMessage(null)
    setUploading(true)
    try {
      const result = await uploadChatImage(file)
      if (result.error) throw new Error(result.error)
      startTransition(async () => {
        const r = await onSend('', result.url ?? '')
        if (r.error) setErrorMessage(r.error)
      })
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '画像のアップロードに失敗しました')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="shrink-0 border-t">
      {errorMessage && (
        <p className="px-3 pt-2 text-xs text-destructive">{errorMessage}</p>
      )}
      <div className="flex gap-2 p-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleImageSelect}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-foreground"
          disabled={isBlocked}
          onClick={() => fileInputRef.current?.click()}
          aria-label="画像を添付"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Paperclip className="h-4 w-4" />
          )}
        </Button>
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
          disabled={isBlocked}
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          disabled={isBlocked || !value.trim()}
          size="sm"
          className="shrink-0"
        >
          送信
        </Button>
      </div>
    </div>
  )
}
