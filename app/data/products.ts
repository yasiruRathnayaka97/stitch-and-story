export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Merino Wool Sweater",
    description: "Luxurious merino wool sweater with a relaxed fit. Perfect for layering in colder months.",
    price: 89.99,
    images: [
      "/images/products/sweater-1.jpg",
      "/images/products/sweater-1-alt.jpg",
    ],
    category: "Sweaters",
    stock: 25,
  },
  {
    id: "2",
    name: "Cotton Linen Shirt",
    description: "Breathable cotton-linen blend shirt with a modern cut. Ideal for warm weather.",
    price: 59.99,
    images: [
      "/images/products/shirt-1.jpg",
      "/images/products/shirt-1-alt.jpg",
    ],
    category: "Shirts",
    stock: 40,
  },
  {
    id: "3",
    name: "Cashmere Scarf",
    description: "Ultra-soft cashmere scarf in a versatile neutral tone. Adds elegance to any outfit.",
    price: 49.99,
    images: [
      "/images/products/scarf-1.jpg",
      "/images/products/scarf-1-alt.jpg",
    ],
    category: "Accessories",
    stock: 30,
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    description: "Sustainable organic cotton t-shirt with a classic fit. Ethically made and environmentally friendly.",
    price: 29.99,
    images: [
      "/images/products/tshirt-1.jpg",
      "/images/products/tshirt-1-alt.jpg",
    ],
    category: "T-Shirts",
    stock: 50,
  },
  {
    id: "5",
    name: "Wool Blend Coat",
    description: "Elegant wool blend coat with a tailored silhouette. Perfect for formal occasions.",
    price: 149.99,
    images: [
      "/images/products/coat-1.jpg",
      "/images/products/coat-1-alt.jpg",
    ],
    category: "Outerwear",
    stock: 15,
  },
  {
    id: "6",
    name: "Silk Pajama Set",
    description: "Luxurious silk pajama set for ultimate comfort. Features a button-up top and drawstring pants.",
    price: 119.99,
    images: [
      "/images/products/pajama-1.jpg",
      "/images/products/pajama-1-alt.jpg",
    ],
    category: "Sleepwear",
    stock: 20,
  },
  {
    id: "7",
    name: "Knitted Beanie",
    description: "Cozy knitted beanie made from recycled yarn. Keeps you warm while being eco-friendly.",
    price: 24.99,
    images: [
      "/images/products/beanie-1.jpg",
      "/images/products/beanie-1-alt.jpg",
    ],
    category: "Accessories",
    stock: 35,
  },
  {
    id: "8",
    name: "Linen Dress",
    description: "Flowy linen dress perfect for summer days. Features adjustable straps and side pockets.",
    price: 79.99,
    images: [
      "/images/products/dress-1.jpg",
      "/images/products/dress-1-alt.jpg",
    ],
    category: "Dresses",
    stock: 18,
  },
  {
    id: "9",
    name: "Denim Jacket",
    description: "Classic denim jacket with a vintage wash. A timeless piece for any wardrobe.",
    price: 89.99,
    images: [
      "/images/products/jacket-1.jpg",
      "/images/products/jacket-1-alt.jpg",
    ],
    category: "Outerwear",
    stock: 22,
  },
  {
    id: "10",
    name: "Alpaca Throw Blanket",
    description: "Incredibly soft alpaca throw blanket. Perfect for cozy nights at home.",
    price: 129.99,
    images: [
      "/images/products/blanket-1.jpg",
      "/images/products/blanket-1-alt.jpg",
    ],
    category: "Home",
    stock: 12,
  },
  {
    id: "11",
    name: "Merino Wool Socks",
    description: "Comfortable merino wool socks that regulate temperature and prevent odor.",
    price: 19.99,
    images: [
      "/images/products/socks-1.jpg",
      "/images/products/socks-1-alt.jpg",
    ],
    category: "Accessories",
    stock: 45,
  },
  {
    id: "12",
    name: "Linen Table Runner",
    description: "Elegant linen table runner with hand-stitched edges. Elevates any dining table.",
    price: 39.99,
    images: [
      "/images/products/tablerunner-1.jpg",
      "/images/products/tablerunner-1-alt.jpg",
    ],
    category: "Home",
    stock: 25,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};
