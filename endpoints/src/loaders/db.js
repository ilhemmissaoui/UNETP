import { connect } from '../db';

const dbLoader = async () => {
    await connect();
};

export default dbLoader;
