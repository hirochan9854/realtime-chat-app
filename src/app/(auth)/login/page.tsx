import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AuthForm } from '@/components/auth/auth-form'

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect('/chat')

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Realtime Chat</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            アカウントにログインまたは新規作成
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
