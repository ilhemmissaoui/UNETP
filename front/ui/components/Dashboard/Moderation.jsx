import Requests from '../Requests';

const Moderation = () => {
    return (
        <div className="col-12 pb-10">
            <div className="card shadow-sm">
                <div className="card-header">
                    <div className="card-title">Les demandes de modération</div>
                </div>
                <Requests />
            </div>
        </div>
    );
};

export default Moderation;
