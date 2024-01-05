import Spinner from 'react-bootstrap/Spinner';
import { useFormContext } from 'react-hook-form';
const FormProviderSafety = ({ children }) => {
    const form = useFormContext();
    return form ? (
        children
    ) : (
        <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <Spinner animation="grow">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default FormProviderSafety;
