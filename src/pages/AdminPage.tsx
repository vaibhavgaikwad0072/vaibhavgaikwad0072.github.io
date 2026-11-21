import { useContent } from '../store/ContentProvider';
import { AdminLogin } from '../admin/AdminLogin';
import { AdminDashboard } from '../admin/AdminDashboard';

export function AdminPage() {
  const { isAdmin } = useContent();
  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
}
