import CoffeeChairImage from "@/assets/images/Coffee_Chair.png";
import SimpleDeskImage from "@/assets/images/Simple_Desk.png";
import BlackLampImage from "@/assets/images/Black_Lamp.png";
import MinimalStandImage from "@/assets/images/Minimal_Stand.png";

export type ProductType = {
  id: number;
  name: string;
  category: string;
  price: number;
  images: number[];
  description?: string;
};

export const products: ProductType[] = [
  {
    id: 1,
    name: "Coffee Chair",
    category: "chairs",
    price: 49.99,
    images: [CoffeeChairImage, MinimalStandImage, CoffeeChairImage],
    description:
      "A comfortable and stylish chair, perfect for a modern office or a cozy reading nook. Crafted from high-quality wood and fabric.",
  },
  {
    id: 2,
    name: "Simple Desk",
    category: "tables",
    price: 50.99,
    images: [SimpleDeskImage, SimpleDeskImage],
    description:
      "A minimalist wooden desk featuring a clean, spacious surface. Ideal for small apartments and home offices where space is premium.",
  },
  {
    id: 3,
    name: "Black Lamp",
    category: "popular",
    price: 15.99,
    images: [BlackLampImage, BlackLampImage],
    description:
      "An elegant, matte black desk lamp providing focused light. Its simple design complements any modern interior.",
  },
  {
    id: 4,
    name: "Minimal Stand",
    category: "popular",
    price: 59.99,
    images: [MinimalStandImage, MinimalStandImage],
    description:
      "A versatile, minimal side stand. Use it next to your sofa or bed to hold your books, drinks, or phone.",
  },
];
