'use client'

import { createClient } from '@/lib/supabase/client'

const BUCKET = 'chat-images'

export async function uploadChatImage(file: File): Promise<{ url?: string; error?: string }> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const supabase = createClient()
  const { data, error } = await supabase.storage.from(BUCKET).upload(path, file)
  if (error) return { error: error.message }
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
  return { url: urlData.publicUrl }
}
