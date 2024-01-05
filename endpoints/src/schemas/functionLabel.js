import yup from '../lib/yup';
import models from '../models';

const { OrganizationType } = models;

const functionLabelSchema = yup.object({
    organizationTypeId: yup
        .number()
        .test(async function (id) {
            if (!(await OrganizationType.count({ where: { id } })))
                return this.createError({ message: 'Organization type not found' });
            return true;
        })
        .required()
        .label("Type d'organisme"),
    singularMaleName: yup.string().required().label('Intitulé masculin'),
    singularFemaleName: yup.string().required().label('Intitulé féminin'),
    pluralMaleName: yup.string().required().label('Intitulé masculin pluriel'),
    pluralFemaleName: yup.string().required().label('Intitulé féminin pluriel'),
    description: yup.string().label('Description'),
    isHeadMaster: yup.boolean().required().label("Chef d'établissement")
});

export default functionLabelSchema;
