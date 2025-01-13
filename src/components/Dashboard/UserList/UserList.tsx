import { useEffect, useState } from 'react';
import { User, UserService } from '../../../services/UserService';

interface UserListProps {
  parentData: string; 
  onPassData: (data: string) => void;
}

export function UserList({ parentData, onPassData }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getUsers();
        setUsers(data);
      } catch (error: any) {
        setError(`Error fetching users - Error: ${error.message}`); 
      }
    };

    fetchUsers();
  }, []);

  const sendDataToParent = () => {
    const dataToSend = 'Hello from UserList!';
    onPassData(dataToSend);
  };

  return (
    <div>
      <h3>User List</h3>
      <p>Parent Data: {parentData}</p>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} {user.surname} - {user.email}
          </li>
        ))}
      </ul>
      <button onClick={sendDataToParent}>Send Data to Dashboard</button>
    </div>
  );
};
