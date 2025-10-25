import CoffeeChairImage from "@/assets/images/Coffee_Chair.png";
import SimpleDeskImage from "@/assets/images/Simple_Desk.png";
import BlackLampImage from "@/assets/images/Black_Lamp.png";
import MinimalStandImage from "@/assets/images/Minimal_Stand.png";

export const products = [
  {
    id: 1,
    name: "Coffee Chair",
    category: "chairs",
    price: 49.99,
    images: [CoffeeChairImage, MinimalStandImage, CoffeeChairImage],
  },
  {
    id: 2,
    name: "Simple Desk",
    category: "tables",
    price: 50.99,
    images: [SimpleDeskImage, SimpleDeskImage],
  },
  {
    id: 3,
    name: "Black Lamp",
    category: "popular",
    price: 15.99,
    images: [BlackLampImage, BlackLampImage],
  },
  {
    id: 4,
    name: "Minimal Stand",
    category: "popular",
    price: 59.99,
    images: [MinimalStandImage, MinimalStandImage],
  },
];
