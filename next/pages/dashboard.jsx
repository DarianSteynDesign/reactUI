import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        async function fetchData() {
            const res = await fetch('http://localhost:5000/api/protected', {
                headers: {  Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setMessage(data.message || 'No message received');
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Welcome to My Dashboard</h1>
            <p>Protected API Response: {message}</p>
        </div>
    );
}
