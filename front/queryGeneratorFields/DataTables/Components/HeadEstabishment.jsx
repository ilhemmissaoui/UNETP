import { FormatPrice } from '../../../ui/utils/currency';
import BooleanFormat from './BooleanFormat';
const HeadEstablishment = ({ data }) => {
    console.log(data);
    return Number.isInteger(data) ? <BooleanFormat data={data} /> : <FormatPrice value={data} />;
};
export default HeadEstablishment;
