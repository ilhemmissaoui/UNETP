import axios from 'axios';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useAuth from '../../../hooks/use-auth';
import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
import { generateShortName } from '../../utils/nav';
import ImagePicker from '../ImagePicker';

const { endpointUrl } = settings;

const UserAvatar = () => {
    const form = useForm();
    const { setToast } = useToast();
    const { user } = useAuth();
    const { watch } = form;
    const image = watch('image');
    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('avatar', image);
        try {
            await axios.post(`${endpointUrl}/users/update-avatar`, formData);
            setToast({ message: 'Votre avatar a été mis à jour avec succès', variant: 'success' });
        } catch (e) {
            setToast({ message: 'Erreur lors de mise à jour de votre avatar', variant: 'danger' });
            console.log(e);
        }
    };
    useEffect(() => {
        if (image) uploadImage(image[0]);
    }, [image]);
    return (
        <FormProvider {...form}>
            <form>
                <ImagePicker
                    defaultImage={
                        user?.profile?.avatar
                            ? `${endpointUrl}/users/avatar/${user?.profile?.id}`
                            : null
                    }
                    withCrop
                    setLabel="téléverser une nouvelle photo de profil">
                    <div className="symbol symbol-125px symbol-lg-125px">
                        <div className="symbol-label display-1 bg-light-danger text-danger">
                            {generateShortName(user?.profile?.firstName, user?.profile?.lastName)}
                        </div>
                    </div>
                </ImagePicker>
            </form>
        </FormProvider>
    );
};

export default UserAvatar;
