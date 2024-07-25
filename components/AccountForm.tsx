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
  const [price, setPrice] = useState<string | null>(null)
  const [rating, setRating] = useState<string | null>(null)
  const [seller, setSeller] = useState<string | null>(null)
  const [specifications, setSpecifications] = useState<string | null>(null)

  const [preview, setPreview] = useState<string>();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('market')
        .select(`full_name, username, website, avatar_url, name, description, price, rating, seller, specifications`)
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
        setPrice(data.price)
        setRating(data.rating)
        setSeller(data.seller)
        setSpecifications(data.specifications)
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
    fullname,
    username,
    website,
    avatar_url,
    name,
    description,
    price,
    rating,
    seller,
    specifications
  }: {
    fullname: string | null
    username: string | null
    website: string | null
    avatar_url: string | null
    name: string | null
    description: string | null
    price: string | null
    rating: string | null
    seller: string | null
    specifications: string | null
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
        price,
        rating,
        seller,
        specifications,
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
    <div>
      <main className='max-w-6xl mx-auto p-10 border'>
        <ProfileCard fullName={fullname} email={user?.email} website={website} company={username} />
        <h1 className='text-4xl font-bold'>Add an Item to the Marketplace</h1>
        <h2 className='text-xl font-semibold pt-5'>Item Details</h2>
        <p className='pb-5'>
          By adding an item to the marketplace, you're essentially Minting an
          NFT of the item into your wallet which we can then list for sale!
        </p>
        <div className='flex flex-col justify pt-5 '>
          <Avatar uid={user?.id ?? null}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateProfile({ fullname, username, website, avatar_url: url, name, description, price, rating, seller, specifications })
            }} />
          
          <label className='font-light'>Name of Item</label>
          <input className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm outline-none'
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
          
          <label className='font-light'>Price</label>
          <input className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm outline-none'
            name='price'
            id='price'
            value={price || ''}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price..." type='text' />
          
          <label className='font-light'>Rating</label>
          <input className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm outline-none'
            name='rating'
            id='rating'
            value={rating || ''}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter Rating..." type='text' />
          
          <label className='font-light'>Seller</label>
          <input className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm outline-none'
            name='seller'
            id='seller'
            value={seller || ''}
            onChange={(e) => setSeller(e.target.value)}
            placeholder="Enter Seller..." type='text' />
          
          <label className='font-light'>Specifications</label>
          <input className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm outline-none'
            name='specifications'
            id='specifications'
            value={specifications || ''}
            onChange={(e) => setSpecifications(e.target.value)}
            placeholder="Enter Specifications..." type='text' />
        </div>
        <div className='p-4'>
          <button
            className='bg-green-600 font-bold 
            text-white rounded-full py-4 px-10 w-56  
            md:mt-auto mx-auto md:ml-auto cursor-pointer'
            onClick={() => updateProfile({ fullname, username, website, avatar_url, name, description, price, rating, seller, specifications })}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>
      </main>
    </div>
  )
}
