const settings = {
    endpointUrl: 'http://localhost:5000/api/v1',
    meta: {
        rootUrl: 'http://localhost',
        title: 'UNETP',
        description: 'The app description goes here.'
    }
};
if (typeof window === 'undefined') {
    delete settings.private;
}

export default settings;
