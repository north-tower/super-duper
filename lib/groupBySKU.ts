import { Organic } from "@/typings/searchTypings";


export function groupBySKU(products: Organic[]): Record<string, Organic[]>{
    return products?.reduce(
        (accumulator: Record<string, Organic[]>, currentProduct: Organic) => {
            const sku = currentProduct.meta;
            if(!accumulator[sku]) {
                accumulator[sku] = [];
            }
            accumulator[sku].push(currentProduct);
            return accumulator;
        }, {}
    )
}