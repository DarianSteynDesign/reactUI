import React from "react";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    console.log("products2:", products);

    return {
      props: {
        products,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
      },
    };
  }
};

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  console.log("products:", products);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h3 className="text-xl font-semibold mb-4">Items to Buy</h3>
      <ul className="space-y-4">
        {products.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <span className="font-medium text-lg">{item.name}</span>
            <span className="text-sm text-gray-500">
              Quantity: {item.quantity}
            </span>
            <span className="text-sm text-gray-500">
              Price: ${item.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
