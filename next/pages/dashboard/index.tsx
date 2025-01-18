import DashboardLayout from '../components/DashboardLayout';
import Posts from '../components/Posts';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1>Dashboard Home</h1>
      <p>Welcome to the dashboard!</p>

      <Posts />
    </DashboardLayout>
  );
}
