export async function getServerSideProps() {
    const res = await fetch('http://localhost:5000/api/users');
    const users = await res.json();

    return {
        props: { users },
    };
}

export default function SSRPage({ users }) {
    return (
        <div>
            <h1>Server-Side Rendered Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
