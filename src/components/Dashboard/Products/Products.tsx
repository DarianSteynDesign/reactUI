import './Products.scss';
import { useCartStore } from '../../../store/dashboard/cartStore';

export interface ProductsProps {
  prop?: string;
}

export function Products() {
  const { addItem, removeItem } = useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
  }));

  const dummyItems = [
    { id: '1', name: 'Apple', quantity: 2, price: 0.99 },
    { id: '2', name: 'Banana', quantity: 5, price: 0.59 },
    { id: '3', name: 'Orange', quantity: 3, price: 1.29 },
  ];

  const handleAddItem = (id: string, name: string, price: number) => {
    console.log('Data add: ', id);
    addItem({ id, name, price });
  };

  const handleRemoveItem = (id: string) => {
    console.log('Data remove: ', id);
    removeItem(id);
  };

  return (
    <div>
      <h3>Items to Buy</h3>
      <ul className='product-list'>
        {dummyItems.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - Price: $
            {item.price.toFixed(2)}
            <button onClick={() => handleAddItem(item.id, item.name, item.price)}>
              +
            </button>
            <button onClick={() => handleRemoveItem(item.id)}>
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
