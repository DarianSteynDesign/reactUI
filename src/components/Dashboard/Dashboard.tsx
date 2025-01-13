import './Dashboard.scss';
import { useState } from 'react';
import { UserList } from './UserList';
import { Products } from './Products';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../../store/authStore';

export function Dashboard() {
  const [userListData, setUserListData] = useState<string>(''); 
  const setProtectedData = useAuthStore((state) => state.setProtectedData);

  //Covered: API Requests - Tanstack Query & Protected API calls
  const { data: protectedData, isLoading: isProtectedDataLoading, error: protectedDataError } = useQuery({
    queryKey: ['protectedData'],
    queryFn: async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const response = await fetch('http://localhost:5000/api/protected', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //Todo - Fix this situation

      // if(response.ok) {
      //   const data = await response.json();
      //   await setUserData(data);
      // } 

      if (!response.ok) {
        throw new Error('Failed to fetch protected data');
      }

      return response.json();
    }
  });

  const isLoading = isProtectedDataLoading;
  const error = protectedDataError;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message || 'An unknown error occurred'}</div>;

  const handleDataFromUserList = (data: string) => {
    setUserListData(data); 
  };

  const setUserData = async (data: any) => {
    try {
      console.log('Data', data);
      setProtectedData(data.user);
    } catch (error) {
      console.log('setUserData', error);
    }
  }

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <div className='user-info'>
        <h3>Welcome:</h3>
        <p>{protectedData?.user?.email}</p>
        <p>{userListData}</p>
      </div>
      {/* Covered: Data passing between components, Child to Parent and Parent to Child*/}
      <UserList parentData='test' onPassData={handleDataFromUserList} />
      <Products />
    </div>
  );
};

export default Dashboard;
