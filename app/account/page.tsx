import AccountForm from '@/component/AccountForm'
import { createClient } from '@/utlis/supabase/server'


export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <AccountForm user={user} />
}