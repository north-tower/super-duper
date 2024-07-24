
import { useCartStore } from '@/store'
import { Organic } from '@/typings/searchTypings'
import React from 'react'
import { Button } from './ui/button';

function RemoveFromCart({product}: { product: Organic}) {

    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const handleRemove = () => {
        console.log("removing from cart", product.meta)

        removeFromCart(product)
    }
  return (
    <Button className='bg-walmart hover:bg-walmart/50' onClick={handleRemove}>-</Button>
  )
}

export default RemoveFromCart