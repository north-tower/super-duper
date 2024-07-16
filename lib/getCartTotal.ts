import { Organic } from "@/typings/searchTypings"


export function getCartTotal(products: Organic[]): string {
    const total = products.reduce(
        (acc: number, currentProduct: Organic) => acc + currentProduct.price,0
    )

    return ` ${
        
        
        total.toFixed(2)}`
}