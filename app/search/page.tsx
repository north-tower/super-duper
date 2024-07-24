import Product from "@/components/Product"
import { Organic } from "@/typings/searchTypings"

type Props = {
  searchParams: {
    q: string;
  }
}

function SearchPage({ searchParams: { q } }: Props) {
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