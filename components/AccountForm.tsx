'use client'
import { useCallback, useEffect, useState } from 'react'

import { type User } from '@supabase/supabase-js'
import { createClient } from '@/utlis/supabase/client'
import Avatar from './Avatar'
import ProfileCard from './ProfileCard'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)


  const [preview, setPreview] = useState<string>();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('market')
        .select(`full_name, username, website, avatar_url,name, description`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setName(data.name)
        setDescription(data.description)


      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
    name,
    description
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
    name: string | null
    description: string | null

  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('market').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        name,
        description,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    // <div className="form-widget">
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input id="email" type="text" value={user?.email} disabled />
    //   </div>
    //   <div>
    //     <label htmlFor="fullName">Full Name</label>
    //     <input
    //       id="fullName"
    //       type="text"
    //       value={fullname || ''}
    //       onChange={(e) => setFullname(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="username">Username</label>
    //     <input
    //       id="username"
    //       type="text"
    //       value={username || ''}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="website">Website</label>
    //     <input
    //       id="website"
    //       type="url"
    //       value={website || ''}
    //       onChange={(e) => setWebsite(e.target.value)}
    //     />
    //   </div>
    //   <Avatar
    //   uid={user?.id ?? null}
    //   url={avatar_url}
    //   size={150}
    //   onUpload={(url) => {
    //     setAvatarUrl(url)
    //     updateProfile({ fullname, username, website, avatar_url: url })
    //   }}
    //   />



    //   <div>
    //     <button
    //       className="button primary block"
    //       onClick={() => updateProfile({ fullname, username, website, avatar_url })}
    //       disabled={loading}
    //     >
    //       {loading ? 'Loading ...' : 'Update'}
    //     </button>
    //   </div>

    //   <div>
    //     <form action="/auth/signout" method="post">
    //       <button className="button block" type="submit">
    //         Sign out
    //       </button>
    //     </form>
    //   </div>
     <div>
      <main className='max-w-6xl mx-auto p-10 border'>
      <ProfileCard fullName={fullname} email={user?.email} website={website} company={username} />
            <h1 className='text-4xl font-bold'>Add an Item to the Marketplace</h1>
            <h2 className='text-xl font-semibold pt-5'>Item Details</h2>
            <p className='pb-5'>
                By adding an item to the marketplace, youre essentially Minting an 
                NFT of the item into your wallet which we can then list for sale!
            </p>
            <div className='flex flex-col justify pt-5 '>
               <Avatar  uid={user?.id ?? null}
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ fullname, username, website,name,description, avatar_url: url })
      }} />
         
                    <label className='font-light'>Name of Item</label>
                    <input className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg 
                    text-sm outline-none'
                    name='name'
                    id='name'
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                     placeholder='Name of item...' type='text' />

                    <label className='font-light'>Description</label>
                    <input className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm outline-none' 
                    name='description'
                    id='description'
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description..." type='text' />
                    
</div>
<div className='p-4'>
        <button
        className='bg-green-600 font-bold 
        text-white rounded-full py-4 px-10 w-56  
        md:mt-auto mx-auto md:ml-auto cursor-pointer'
          onClick={() => updateProfile({ fullname, username, website, avatar_url,name, description })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
            </main>
    </div>
  )
}