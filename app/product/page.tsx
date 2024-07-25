"use client";

import Image from "next/image";
import { Organic, Specification } from "@/typings/searchTypings"; // Adjust the import path as necessary
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddToCart from "@/components/AddToCart";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utlis/supabase/client";

function ProductPage() {
  const supabase = createClient();
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const product: Organic = {
    url: "sample-url",
    images: [
      "https://images.pexels.com/photos/704748/pexels-photo-704748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1043503/pexels-photo-1043503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // Add more URLs as needed
    ],
    price: 10.99,
    title: "Sample Product",
    rating: "4.5",
    seller: "Sample Seller",
    product_id: "123456",
    badge: "Bestseller",
    breadcrumbs: ["sports", "fun"],
    description: "Sample product description goes here.",
    specifications: [
      { key: "Feature", value: "Cool" },
      { key: "Size", value: "3 inch" },
      // Add more specifications as needed
    ],
    meta: "100",
  };

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("market")
        .select(`full_name, username, website, avatar_url, name, description`)
        .single();

      console.log('Data:', data);
      console.log('Error:', error);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setName(data.name);
        setDescription(data.description);
      }
    } catch (error) {
      console.error('Error loading user data!', error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  console.log('Fullname:', fullname);
  return (
    <div className="p-4 lg:p-10 flex flex-col lg:flex-row w-full">
   
      <div className="hidden lg:inline space-y-4">
        {product.images.map((image, i) => (
          <Image
            key={i}
            src={image}
            alt={product.title}
            width={90}
            height={90}
            className="border rounded-sm"
          />
        ))}
      </div>
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-3/5 mb-10 lg:mb-0 lg:w-full self-start flex items-center max-w-xl mx-auto lg:mx-20"
      >
        <CarouselContent>
          {product.images.map((image, i) => (
            <CarouselItem key={i}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center p-2 relative">
                  <Image
                    src={image}
                    alt={product.title}
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex-1 border rounded-md w-full p-5 space-y-5">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="space-x-2">
          {product.breadcrumbs.map((breadcrumb, i) => (
            <Badge key={breadcrumb + i} className={breadcrumb} variant="outline">
              {breadcrumb}
            </Badge>
          ))}
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: product.description,
          }}
          className="py-5"
        />

        <p className="text-yellow-500 text-sm">
          {product.rating} *
          <span className="text-gray-400 ml-2">reviews</span>
        </p>
        <p className="text-2xl font-bold mt2">KES{product.price}</p>

        <AddToCart product={product} />

        <hr />

        <h3 className="font-bold text-xl pt-10">Specifications</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Specification</TableHead>
              <TableHead className="w-[100px]">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.specifications.map((spec, i) => (
              <TableRow key={i}>
                <TableCell className="font-bold">{spec.key}</TableCell>
                <TableCell>{spec.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ProductPage;
