import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Organic } from './typings/searchTypings'
// import type {} from '@redux-devtools/extension' // required for devtools typing

interface CartState {
  cart: Organic[];
  addToCart: (product: Organic) => void;
  removeFromCart: (product: Organic) => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        addToCart: (product) => {
            set((state) => ({
                cart: [...state.cart, product]
            }));
        },
        removeFromCart: (product) => {
            const productToRemove = get().cart.findIndex(
                (p) => p.meta === product.meta
            );

            set((state) => {
                const newCart = [...state.cart];

                newCart.splice(productToRemove, 1);
                return {cart: newCart}
            })

        }
      }),
      {
        name: "shopping-cart-storage"
      }
     
    ),
  ),
)