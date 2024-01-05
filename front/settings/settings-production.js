const settings = {
    endpointUrl: 'https://api-unetp.klaim.fr/api/v1',

    meta: {
        rootUrl: 'https://sg-unetp.klaim.fr',
        title: 'UNETP',
        description: 'The app description goes here.'
    }
};
if (typeof window === 'undefined') {
    delete settings.private;
}

export default settings;
