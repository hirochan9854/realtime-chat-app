import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { ChannelSidebar } from '@/components/chat/channel-sidebar'

export default async function ChatPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const channels = await prisma.channel.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, name: true, createdAt: true },
  })

  return (
    <div className="flex h-screen flex-col">
      <header className="flex shrink-0 items-center justify-between border-b px-6 py-3">
        <span className="font-semibold">Realtime Chat</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <form action={signOut}>
            <Button type="submit" variant="outline" size="sm">
              ログアウト
            </Button>
          </form>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <ChannelSidebar initialChannels={channels} />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">チャンネルを選択してください</p>
        </main>
      </div>
    </div>
  )
}
