import { useEffect, useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('http://localhost:5000/api/protected', {
                    credentials: 'include',
                });
    
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
    
                const data = await res.json();
                setMessage(data.message || 'No message received');
            } catch (error) {
                console.error('Failed to fetch protected resource:', error);
                setMessage('Failed to fetch data');
            }
        }
    
        fetchData();
    }, []);
    

    return (
        <div>
            <h1>Welcome to My App</h1>
            <p>Protected API Response: {message}</p>
        </div>
    );
}
