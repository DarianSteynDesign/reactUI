import { useEffect, useState } from 'react';
import './Lazy.scss';
import { User, UserService } from '../../services/UserService';

export interface LazyProps {
  prop?: string;
}

export function Lazy() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getUsers(); // No need for response.json() anymore
        setUsers(data);
      } catch (error: any) { // Provide a type for the error object
        setError(`Error fetching users - Error: ${error.message}`); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h3>User List</h3>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} {user.surname} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
