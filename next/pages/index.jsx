import { useEffect, useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:5000/api/protected', {
                headers: { Authorization: `Bearer YOUR_TOKEN_HERE` },
            });
            const data = await res.json();
            setMessage(data.message || 'No message received');
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
