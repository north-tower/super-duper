export interface Specification {
  key: string;
  value: string;
}

export interface Organic {
  url: string;
  images: string[];
  price: number;
  title: string;
  rating: string;
  seller: string;
  product_id: string;
  badge?: string;
  breadcrumbs: string[];
  description: string;
  specifications: Specification[];
  meta: string
}