import useAuth from '../../hooks/use-auth';
import AdminLayout from './AdminLayout';
import EstablishmentLayout from './EstablishmentLayout';
const Layout = ({ children }) => {
    const { user } = useAuth();
    const Component = [100, 20].includes(user?.role) ? AdminLayout : EstablishmentLayout;
    return <Component>{children}</Component>;
};

export default Layout;
