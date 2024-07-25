import AccountForm from '@/components/AccountForm'
import Header from '@/components/Header'
import { createClient } from '@/utlis/supabase/server'


export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <AccountForm user={user} />
    </>
  )
  
  
}