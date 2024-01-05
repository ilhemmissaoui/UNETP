import List from '../../../SharedComponents/Histories/List';
import ViewRow from './ViewRow';

const History = ({ data = [] }) => {
    return (
        <>
            <List data={data?.histories} Row={ViewRow} columnsCount={3} />
        </>
    );
};

export default History;
