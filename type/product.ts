interface IProductDimensions {
  width: number;
  height: number;
  depth: number;
}

interface IProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface IProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface IProduct {
  quantity: number;
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: IProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IProductMeta;
  images: string[];
  thumbnail: string;
}

interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
export type {
  IProduct,
  IProductDimensions,
  IProductMeta,
  IProductReview,
  IProductsResponse,
};
