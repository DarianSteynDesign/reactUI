import { useRouter } from 'next/router';

export default function UserPage() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>User Details</h1>
            <p>User ID: {id}</p>
        </div>
    );
}
