'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  name: z.string().min(1, 'チャンネル名を入力してください').max(50, '50文字以内で入力してください'),
})

export async function createChannel(name: string): Promise<{ error?: string; success?: boolean }> {
  const result = schema.safeParse({ name })
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '認証が必要です' }
  }

  try {
    await prisma.channel.create({
      data: { name: result.data.name, createdBy: user.id },
    })
  } catch {
    return { error: 'チャンネル名が既に存在します' }
  }

  revalidatePath('/chat')
  return { success: true }
}
