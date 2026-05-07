import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { ChatLayout } from '@/components/chat/chat-layout'

export default async function ChatPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [channels, profile] = await Promise.all([
    prisma.channel.findMany({
      orderBy: { createdAt: 'asc' },
      select: { id: true, name: true, createdAt: true },
    }),
    prisma.profile.findUnique({
      where: { id: user.id },
      select: { username: true },
    }),
  ])

  const currentUser = {
    id: user.id,
    username: profile?.username ?? user.email ?? 'Unknown',
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex shrink-0 items-center justify-between border-b px-6 py-3">
        <span className="font-semibold">Realtime Chat</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{currentUser.username}</span>
          <form action={signOut}>
            <Button type="submit" variant="outline" size="sm">
              ログアウト
            </Button>
          </form>
        </div>
      </header>
      <ChatLayout initialChannels={channels} currentUser={currentUser} />
    </div>
  )
}
