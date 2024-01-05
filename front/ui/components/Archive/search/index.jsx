import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { SearchTrashSchema } from '../../../../schemas/searchTrash';

const searchType = {
    user: { label: 'Personne', path: '/archives/users' },
    organization: { label: 'Organisme', path: '/archives/organizations' }
};

const Search = () => {
    const searchForm = useForm({
        resolver: yupResolver(SearchTrashSchema)
    });
    const { push } = useRouter();

    const {
        watch,
        register,

        handleSubmit,
        formState: { errors }
    } = searchForm;

    const type = watch('elementType');

    const handleSearch = ({ name }) => {
        push(`${searchType[type].path}?name=${encodeURIComponent(name)} `);
    };

    return (
        <>
            <Head>
                <title>Archives | {process.env.platformName} </title>
            </Head>
            <div className="card text-center pt-20 my-10">
                <h2 className="fs-2x fw-bolder mb-5"> Bienvenue</h2>
                <form
                    id="search"
                    onSubmit={handleSubmit(handleSearch)}
                    className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="form-group mx-auto mb-3">
                                    <label
                                        htmlFor="establishmentNumber"
                                        className="form-label required ">
                                        Type d&apos;éléments :
                                    </label>
                                    <select
                                        name="elementType"
                                        className={clsx('form-select', {
                                            'is-invalid': errors?.elementType
                                        })}
                                        {...register('elementType')}>
                                        <option value="">- Sélectionner -</option>
                                        {Object.entries(searchType).map(([key, { label }]) => (
                                            <option value={key} key={key}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback  d-flex">
                                        {errors?.elementType?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mx-auto mb-3">
                                    <label htmlFor="name" className="form-label ">
                                        Nom :
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={clsx('form-control', {
                                            'is-invalid': errors?.name
                                        })}
                                        {...register('name')}
                                    />
                                    <div className="invalid-feedback  d-flex">
                                        {errors?.name?.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary" form="search">
                                Rechercher
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="text-center px-4">
                <img className="mw-100 mh-200px" alt="" src="/images/graphics/empty.svg" />
            </div>
        </>
    );
};

export default Search;
