const Dummy = () => {};

export default Dummy;
export const getServerSideProps = () => {
    return {
        redirect: {
            destination: '/configuration/gestion-fonctions',
            permanent: true
        }
    };
};
