export async function getStaticProps() {
    const res = await fetch("http://localhost:5000/api/users/", {
      headers: { "Cache-Control": "no-store" },
      next: {revalidate: 5}
    });
    console.log("Fetching users");
    const users = await res.json();
  
    return {
      props: { users },
      revalidate: 5
    };
  }
  
  export default function ISRPage({ users }) {
    return (
      <div>
        <h1>ISR Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }