'use client'

import Product from "@/components/Product"
import { Organic } from "@/typings/searchTypings"
import { createClient } from '@/utlis/supabase/client'
import { useCallback, useEffect, useState } from "react"


type Props = {
  searchParams: {
    q: string;
  }
}

function SearchPage({ searchParams: { q } }: Props) {
  const supabase = createClient();
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

  const sampleProduct: Organic = {
    url: "sample-url",
    image: "https://images.pexels.com/photos/704748/pexels-photo-704748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: "$10.99",
    title: "Sample Product",
    rating: "4.5",
    seller: "Sample Seller",
    product_id: "123456",
    badge: "Bestseller",
  };

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('market')
        .select(`full_name, username, website, avatar_url, name, description, price, rating, seller, specifications`)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        console.log(data)
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
  }, [supabase]);

  useEffect(() => {
    getProfile()
  }, [getProfile])

  return (
  <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">
        Result for {q} </h1>
        <h2 className="mb-5 text-gray-400">
          100 results </h2>

          <ul className="grid grid-cols-1 
          sm:grid-cols-2 lg:grid-cols-3 
          xl:grid-cols-4 gap-5">
              <li>
              <Product product={sampleProduct} />
                </li>
            </ul>
    </div>
  );
}

export default SearchPage;