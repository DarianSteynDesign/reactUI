export interface User {
  _id: number;
  name: string;
  surname: string;
  email: string;
}

export const UserService = {
  async getUsers(): Promise<User[]> { 
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json() as Promise<User[]>; 
  }
};
