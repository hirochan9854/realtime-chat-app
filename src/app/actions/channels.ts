'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { Prisma } from '@/generated/prisma/client'
import { getAuthenticatedUser } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

function isPrismaUniqueConstraintError(e: unknown): boolean {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
}

const schema = z.object({
  name: z.string().min(1, 'チャンネル名を入力してください').max(50, '50文字以内で入力してください'),
})

type CreatedChannel = { id: string; name: string; createdAt: Date }

export async function createChannel(
  name: string,
): Promise<{ error?: string; channel?: CreatedChannel }> {
  const result = schema.safeParse({ name })
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const user = await getAuthenticatedUser()
  if (!user) return { error: '認証が必要です' }

  let channel: CreatedChannel
  try {
    channel = await prisma.channel.create({
      data: { name: result.data.name },
      select: { id: true, name: true, createdAt: true },
    })
  } catch (e) {
    if (isPrismaUniqueConstraintError(e)) {
      return { error: 'チャンネル名が既に存在します' }
    }
    return { error: 'チャンネルの作成に失敗しました' }
  }

  revalidatePath('/chat')
  return { channel }
}
