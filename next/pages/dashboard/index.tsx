import { Products } from '../../app/ui/Products';
import DashboardLayout from './DashboardLayout';
import Posts from '../../app/ui/Posts';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className='text-lg font-semibold text-gray-800'>Dashboard Home</h1>
      <p className='text-gray-600 mt-2 mb-5'>Welcome to the dashboard!</p>

      <Posts />
      <Products />
    </DashboardLayout>
  );
}
