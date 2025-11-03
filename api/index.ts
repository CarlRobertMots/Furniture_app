import * as MongoService from "./productService";
import * as LocalService from "./localProductService";
import { ProductType, CreateProductInput } from "./productService";

interface ProductServiceContract {
  getProducts: () => Promise<ProductType[]>;
  getProductById: (id: string) => Promise<ProductType>;
  getMyProducts: () => Promise<ProductType[]>;
  createProduct: (productData: CreateProductInput) => Promise<ProductType>;
  deleteProduct: (id: string) => Promise<void>;

  getFavourites: () => Promise<ProductType[]>;
  addFavourite: (productId: string) => Promise<void>;
  removeFavourite: (productId: string) => Promise<void>;
}

export const USE_MOCK_DATA = true;

const Service: ProductServiceContract = USE_MOCK_DATA
  ? (LocalService as unknown as ProductServiceContract)
  : (MongoService as unknown as ProductServiceContract);

export const {
  getProducts,
  getProductById,
  getMyProducts,
  createProduct,
  deleteProduct,
  getFavourites,
  addFavourite,
  removeFavourite,
} = Service;
export type { ProductType, CreateProductInput };
