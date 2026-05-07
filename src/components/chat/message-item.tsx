import type { MessageWithUser } from '@/app/actions/messages'

type Props = {
  message: MessageWithUser
  isOwn: boolean
}

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
}

export function MessageItem({ message, isOwn }: Props) {
  return (
    <div className={`flex flex-col gap-0.5 ${isOwn ? 'items-end' : 'items-start'}`}>
      <div className={`flex items-baseline gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        <span className="text-xs font-semibold text-foreground">{message.user.username}</span>
        <span className="text-xs text-muted-foreground">{formatTime(message.createdAt)}</span>
      </div>
      <div
        className={`max-w-xs rounded-2xl px-3 py-2 text-sm break-words lg:max-w-md ${
          isOwn
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-secondary text-secondary-foreground rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
