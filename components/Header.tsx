"use client"

import Image from 'next/image';
import Link from 'next/link';
import {
 
  Grid2x2,
  Heart,
  LayoutGrid,
  Search,
  ShoppingCart,
  User,
} from 'lucide-react';
import { FormEvent } from "react"
import {useRouter } from "next/navigation"
import { getCartTotal } from '@/lib/getCartTotal';
import { useCartStore } from '@/store';

function Header() {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.input.value;
    router.push(`/search?q=${input}`)
  }
  const cart = useCartStore((state) => state.cart)
  const total = getCartTotal(cart)
  return (
    <header className="flex flex-col md:flex-row items-center bg-walmart px-10 py-7 space-x-5">
      <Link href="/" className="">
        <Image
          src="https://i.imgur.com/5V4wehM.png"
          alt="logo"
          width={150}
          height={150}
        />
      </Link>

      <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full w-full flex-1">
        <input
          type="text"
          name="input"
          placeholder="Search Everything..."
          className="flex-1 px-4 rounded-l-full outline-none 
        placeholder:text-sm"
        />
        <button type="submit">
          <Search className="rounded-full h-10 px-2 w-10 bg-yellow-400 cursor-pointer" />
        </button>
      </form>

      <div className="flex space-x-5 mt-5 md:mt-0">
        <Link
          href={'/'}
          className="hidden lg:flex text-white font-bold items-center space-x-2 text-sm"
        >
          <Grid2x2 size={20} />
          <p>Departments</p>
        </Link>
        <Link
          href={'/'}
          className="hidden lg:flex text-white font-bold items-center space-x-2 text-sm"
        >
          <LayoutGrid size={20} />
          <p>Services</p>
        </Link>
        <Link  href={"/"} className="flex text-white font-bold items-center space-x-2 text-sm">
          <Heart size={20} />
          <div>
            <p className="text-xs font-extralight">Reorder</p>
            <p>My Items</p>
            </div>
          </Link>
          <Link  href={"/"} className="flex text-white font-bold items-center space-x-2 text-sm">
            <User size={20} />
            <div>
              <p className="text-xs font-extralight">Sign in</p>
              <p>Account</p>
              </div>
          </Link>

          <Link href={"/basket"} 
          className="flex text-white font-bold items-center space-x-2 text-sm">
            <ShoppingCart size={20} />
            <div>
              <p className="text-xs font-extralight">{cart.length > 0 ? 
              `${cart.length} items`: "No items"}</p>
              <p>KES{total}</p>
              </div>
              </Link>
        
      </div>
    </header>
  );
}

export default Header;