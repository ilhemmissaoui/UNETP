import yup from '../lib/yup';
import { checkIsRefrenceAvailable } from '../routes/v1/diplomas.route';

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
        .test('isAvailable', 'refrence already exists', async function (v) {
            return await checkIsRefrenceAvailable(
                `${v?.gradeId + v?.subGroupId + v?.functionId + v?.specialtyId + v?.typeId}`,
                this.parent.id
            );
        })
});

export default diplomasSchema;
