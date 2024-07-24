"use client"

import { useCartStore } from '@/store'
import { Organic } from '@/typings/searchTypings'
import { stat } from 'fs'
import React from 'react'
import { Button } from './ui/button'
import RemoveFromCart from './RemoveFromCart'

function AddToCart({product}: {product: Organic}) {
    const [cart, addToCart] = useCartStore((state) => [
        state.cart,
        state.addToCart,
    ]);

    console.log(cart);

    const howManyInCart = cart.filter(
        (item) => item.meta === product.meta
    ).length;

    console.log("How many in cart", howManyInCart);

    const handleAdd = () => {
        console.log("Adding to cart", product);
        addToCart(product);
    }

    if(howManyInCart > 0) {
        return(
        <div className='flex space-x-5 items-center'>
            <RemoveFromCart product={product} />
            {/* <p>-</p> */}
            <span>{howManyInCart}</span>
            <Button className='bg-walmart hover:bg-walmart/50'
             onClick={handleAdd}>
            +</Button>
        </div>

        )
        



    }



  return (
    <Button className='bg-walmart hover:bg-walmart/50' 
    onClick={handleAdd}>Add To Cart</Button>
  )
}

export default AddToCart