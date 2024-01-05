import axios from 'axios';

import yup from '../lib/yup';
import settings from '../settings';
const { endpointUrl } = settings;
export const filterSchema = yup.object({
    name: yup
        .string()
        .trim()
        .transform((v) => {
            return v?.length > 0 ? encodeURIComponent(v) : undefined;
        })
        .transform((v) => (v?.length > 0 ? v : undefined)),
    reference: yup
        .string()
        .trim()
        .transform((v) => {
            return v?.length > 0 ? encodeURIComponent(v) : undefined;
        })
        .transform((v) => (v?.length > 0 ? v : undefined)),
    diplomaGradeId: yup.number().transform((v) => (isNaN(v) ? undefined : v)),
    diplomaSpecialtyId: yup.number().transform((v) => (isNaN(v) ? undefined : v)),
    diplomaGroupId: yup.number().transform((v) => (isNaN(v) ? undefined : v))
});
const diplomasSchema = yup.object({
    id: yup.string(),
    reference: yup
        .object({
            gradeId: yup.string().required().label('Niveau'),
            specialtyId: yup.string().required().label('Spécialité'),
            domainId: yup.string().required().label('Domaine'),
            groupId: yup.string().required().label('Groupe'),
            subGroupId: yup.string().required().label('Sous-groupe'),
            typeId: yup.string().required().label('Type'),
            functionId: yup.string().required().label('Fonction')
        })
        .test('diplomaExists', 'Un diplôme avec cette référence existe déjà', async function (v) {
            console.log(this.parent);
            if (v?.gradeId && v?.subGroupId && v?.functionId && v?.specialtyId && v?.typeId) {
                const { data } = await axios.get(
                    `${endpointUrl}/diplomas/is-available/${
                        v?.gradeId + v?.subGroupId + v?.functionId + v?.specialtyId + v?.typeId
                    }${this?.parent?.id ? `?exclude=${this?.parent?.id}` : ''}`
                );
                console.log(data);
                return data?.isAvailable;
            }
            return true;
        })
});

export default diplomasSchema;
