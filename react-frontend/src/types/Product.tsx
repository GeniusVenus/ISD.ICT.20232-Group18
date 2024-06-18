type Product = {
  name: string;
  description: string;
  sku: string;
  price: number;
  categoryName: string;
  quantity: number;
  albums?: string;
  trackList?: string;
  recordLabel?: string;
  genre?: string;
  artist?: string;
  releaseDate?: string;
  language?: string;
  coverType?: string;
  numberOfPage?: number;
  publicationDate?: string;
  publisher?: string;
  author?: string;
  studio?: string;
  director?: string;
  discType?: string;
  runtime?: string;
};

export default Product;
