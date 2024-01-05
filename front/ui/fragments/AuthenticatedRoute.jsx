import useAuth from '../../hooks/use-auth';
import NotFound from '../../pages/404';
import Loading from '../components/Loading';

const AuthenticatedRoute = ({ children }) => {
    const { loading, user } = useAuth();
    if (!loading && !user) return <NotFound />;
    else if (loading) return <Loading />;
    else return <>{children}</>;
};

export const withAuthenticatedRoute = (Component) => (props) =>
    (
        <AuthenticatedRoute>
            <Component {...props} />
        </AuthenticatedRoute>
    );
export default AuthenticatedRoute;
