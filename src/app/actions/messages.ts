'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export type MessageWithUser = {
  id: string
  content: string | null
  createdAt: Date
  userId: string
  channelId: string
  user: { username: string }
}

const sendSchema = z.object({
  content: z.string().min(1).max(2000),
})

export async function fetchMessages(
  channelId: string,
): Promise<{ messages?: MessageWithUser[]; error?: string }> {
  try {
    const messages = await prisma.message.findMany({
      where: { channelId },
      include: { user: { select: { username: true } } },
      orderBy: { createdAt: 'asc' },
    })
    return { messages }
  } catch {
    return { error: 'メッセージの取得に失敗しました' }
  }
}

export async function fetchMessageById(
  id: string,
): Promise<{ message?: MessageWithUser; error?: string }> {
  try {
    const message = await prisma.message.findUnique({
      where: { id },
      include: { user: { select: { username: true } } },
    })
    if (!message) return { error: 'メッセージが見つかりません' }
    return { message }
  } catch {
    return { error: 'メッセージの取得に失敗しました' }
  }
}

export async function sendMessage(
  channelId: string,
  content: string,
): Promise<{ message?: MessageWithUser; error?: string }> {
  const result = sendSchema.safeParse({ content })
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: '認証が必要です' }

  try {
    const message = await prisma.message.create({
      data: { channelId, userId: user.id, content: result.data.content },
      include: { user: { select: { username: true } } },
    })
    return { message }
  } catch {
    return { error: 'メッセージの送信に失敗しました' }
  }
}
