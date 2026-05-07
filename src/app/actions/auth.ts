'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

const signInSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
})

const signUpSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  username: z.string().min(1, 'ユーザー名を入力してください').max(50, 'ユーザー名は50文字以内で入力してください'),
})

type ActionResult = { error: string }

export async function signIn(email: string, password: string): Promise<ActionResult> {
  const result = signInSchema.safeParse({ email, password })
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) return { error: error.message }

  redirect('/chat')
}

export async function signUp(
  email: string,
  password: string,
  username: string,
): Promise<ActionResult> {
  const result = signUpSchema.safeParse({ email, password, username })
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) return { error: error.message }
  if (!data.user) return { error: 'ユーザー作成に失敗しました' }

  // handle_new_user トリガーが email を username として profiles に INSERT 済み
  // 入力された username に更新する
  await prisma.profile.update({
    where: { id: data.user.id },
    data: { username: result.data.username },
  })

  redirect('/chat')
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
