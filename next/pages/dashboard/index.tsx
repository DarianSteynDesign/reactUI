import { useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Posts from '../components/Posts';
import router from 'next/router';

export default function DashboardPage() {
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      router.push('/login');
    } else {
      fetch('/api/verify-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid === false) {
          router.push('/login');
        }
      })
      .catch(() => {
        router.push('/login');
      });
    }
  }, [router]);
  
  return (
    <DashboardLayout>
      <h1 className='text-lg font-semibold text-gray-800'>Dashboard Home</h1>
      <p className='text-gray-600 mt-2 mb-5'>Welcome to the dashboard!</p>

      <Posts />
    </DashboardLayout>
  );
}
