import React, { useEffect, useMemo, useState } from "react";
import { GetStaticProps } from "next";
import { useMessageFlow } from "../../app/hooks/useMessageFlow";
import { ProductComponent } from "./Products";
import FilterComponent from "./FilterComponent";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();

    return {
      props: { products },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [] } };
  }
};

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  image: string;
}

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  const [filters, setFilters] = useState<{ price?: number; rating?: number; type?: string }>({});

  // Apply filters
  const filteredProducts = products.filter((product) => {
    return (
      (filters.type === undefined || filters.type === "" || product.type === filters.type) &&
      (filters.price === undefined || product.price <= filters.price) &&
      (filters.rating === undefined || product.rating >= filters.rating)
    );
  });

  const messageFlow = useMemo(() => [
    {
      text: "Ok you've made it to the products page, you can click on me to see the products you have added to the cart.",
      position: [2, 5] as [number, number],
      delayTime: 7000,
      chatBubblePostion: { x: -100, y: -100 }
    },
    {
      text: "I'll be here if you need anything",
      position: [2, 1] as [number, number],
      delayTime: 4000,
      clearAfterDelay: true,
    },
  ], []);
  
  useMessageFlow(messageFlow);  

  return (
    <div className="max-w-6xl mx-auto pt-5">
      <h3 className="text-3xl text-left font-semibold text-white mb-5">Products</h3>

      {/* Filter Component */}
      <FilterComponent onFilterChange={setFilters} />

      {/* Filtered Product List */}
      <ProductComponent products={filteredProducts} />
    </div>
  );
};

export default Products;
