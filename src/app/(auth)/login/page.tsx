import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AuthForm } from '@/components/auth/auth-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect('/chat')

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md border shadow-md">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">Realtime Chat</CardTitle>
          <CardDescription>アカウントにログインまたは新規作成</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  )
}
