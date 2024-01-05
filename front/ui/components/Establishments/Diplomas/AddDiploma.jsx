import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';
const AddDiploma = ({ changeMode }) => {
    const [specialties, setSpecialties] = useState([]);

    const addForm = useFormContext();
    const {
        watch,
        register,
        setValue,
        formState: { errors }
    } = addForm;
    const {
        grades: { page: grades, loading: isGradesLoading },
        diplomas: { page: diplomas }
    } = useMultiCRUDContext();
    const gradeId = watch('gradeId');
    useEffect(() => {
        if (gradeId) {
            setSpecialties([]);
            setValue('diplomaId', '');
            const filteredSpecialties = diplomas?.nodes?.filter((e) => e.diplomaGradeId == gradeId);
            setSpecialties(filteredSpecialties);
        }
    }, [gradeId]);

    return (
        <div>
            <div className="form-group mb-3">
                <label htmlFor="" className="h5">
                    Choisir un diplôme
                </label>
            </div>
            <span className="fw-bold fs-7 text-gray-600">
                <span className="fw-bold fs-7 text-gray-600">
                    Si vous préférez, vous pouvez rechercher un diplôme à partir de sa référence.{' '}
                    <a className="fs-7" type="button" href="#" onClick={changeMode('search')}>
                        rechercher un diplôme.
                    </a>
                </span>
            </span>
            <br /> <br />
            {!isGradesLoading && (
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label  required">
                        Niveau :
                    </label>
                    <select
                        {...register('gradeId')}
                        className={clsx('form-select', {
                            'is-invalid': errors?.gradeId
                        })}>
                        {grades?.nodes?.map((e) => (
                            <option key={e?.id} value={e?.id}>
                                {e?.label}
                            </option>
                        ))}
                    </select>
                    <span className="invalid-feedback">{errors?.gradeId?.message}</span>
                </div>
            )}
            {specialties?.length > 0 && (
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label required">
                        Spécialité :
                    </label>
                    <select
                        {...register('diplomaId')}
                        className={clsx('form-select', {
                            'is-invalid': errors?.diplomaId
                        })}>
                        <option value="">- Sélectionner -</option>
                        {specialties?.map(({ diplomaSpecialty, id }) => (
                            <option key={diplomaSpecialty?.id} value={id}>
                                {diplomaSpecialty?.label}
                            </option>
                        ))}
                    </select>
                    <span className="invalid-feedback">{errors?.diplomaId?.message}</span>
                </div>
            )}
            <div className="separator border-secondary  my-5"></div>
            <div className="form-group mb-3 col-md-12">
                <label htmlFor="" className="form-label">
                    Complément :
                </label>
                <textarea
                    name="complement"
                    className={clsx('form-control', {
                        'is-invalid': errors?.complement
                    })}
                    {...register('complement')}
                />
                <span className="invalid-feedback d-flex">{errors?.complement?.message}</span>
            </div>
        </div>
    );
};

export default AddDiploma;
