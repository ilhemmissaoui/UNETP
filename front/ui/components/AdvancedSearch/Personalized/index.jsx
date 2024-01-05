import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import useCRUD from '../../../../hooks/use-crud';
import { SearchPredefinedSchema } from '../../../../schemas/SearchPredefinedSchema';
const PedefinedSearch = ({ title = 'Bienvenue', statement = 'Recherche prédéfinies' }) => {
    const { push } = useRouter();

    const requests = useCRUD({
        singleName: 'request',
        pluralName: 'requests',
        pageSize: null
    });

    const { page } = requests;

    const searchForm = useForm({
        resolver: yupResolver(SearchPredefinedSchema)
    });
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = searchForm;
    const handleSearch = async ({ request }) => {
        push(`/recherche-avancee/personnalise/requete/execute/${request}`);
        console.log(request);
    };

    return (
        <div className=" text-center">
            <h2 className="fs-2x fw-bolder mb-5">{title}</h2>
            <p className="text-gray-500 fs-4 fw-bold mb-10">{statement}</p>
            <form id="search" onSubmit={handleSubmit(handleSearch)}>
                <div className="form-group col-md-4 mx-auto mb-3">
                    <label htmlFor="establishmentNumber" className="form-label   required">
                        Veuillez choisir une requête :
                    </label>
                    <select
                        name="request"
                        placeholder="Veuillez choisir une requête.."
                        className="form-select"
                        {...register('request')}>
                        <option selected value="">
                            - Sélectionner -
                        </option>
                        {page?.nodes?.map(({ label, id }) => (
                            <option key={id} value={id}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback  d-flex">{errors?.request?.message}</div>
                </div>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-edit">Exécuter cette requête</Tooltip>}>
                    <button className="btn btn-primary" form="search">
                        Voir le résultat
                    </button>
                </OverlayTrigger>
            </form>

            <div className="text-center px-4">
                <img className="mw-100 mh-200px" alt="" src="/images/graphics/empty.svg" />
            </div>
        </div>
    );
};

export default PedefinedSearch;
