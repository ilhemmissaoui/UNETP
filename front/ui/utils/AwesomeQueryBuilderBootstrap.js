import BootstrapButton from 'react-awesome-query-builder/lib/components/widgets/bootstrap/core/BootstrapButton';
import BootstrapButtonGroup from 'react-awesome-query-builder/lib/components/widgets/bootstrap/core/BootstrapButtonGroup';
import BootstrapConfirm from 'react-awesome-query-builder/lib/components/widgets/bootstrap/core/BootstrapConfirm';
import BootstrapConjs from 'react-awesome-query-builder/lib/components/widgets/bootstrap/core/BootstrapConjs';
import BootstrapFieldSelect from 'react-awesome-query-builder/lib/components/widgets/bootstrap/core/BootstrapFieldSelect';
import BootstrapValueSources from 'react-awesome-query-builder/lib/components/widgets/bootstrap/core/BootstrapValueSources';
import BootstrapBooleanWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapBoolean';
import BootstrapDateWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapDate';
import BootstrapDateTimeWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapDateTime';
import BootstrapMultiSelectWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapMultiSelect';
import BootstrapNumberWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapNumber';
import BootstrapSelectWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapSelect';
import BootstrapSliderWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapSlider';
import BootstrapTextWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapText';
import BootstrapTextAreaWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapTextArea';
import BootstrapTimeWidget from 'react-awesome-query-builder/lib/components/widgets/bootstrap/value/BootstrapTime';
const BootstrapProvider = ({ children }) => children;
import { BasicConfig } from 'react-awesome-query-builder/lib';
const settings = {
    ...BasicConfig.settings,

    renderField: (props) => <BootstrapFieldSelect {...props} />,
    renderOperator: (props) => <BootstrapFieldSelect {...props} />,
    renderFunc: (props) => <BootstrapFieldSelect {...props} />,
    renderConjs: (props) => <BootstrapConjs {...props} />,
    renderButton: (props) => <BootstrapButton {...props} />,
    renderButtonGroup: (props) => <BootstrapButtonGroup {...props} />,
    renderValueSources: (props) => <BootstrapValueSources {...props} />,
    renderProvider: (props) => <BootstrapProvider {...props} />,
    renderConfirm: BootstrapConfirm
};

const widgets = {
    ...BasicConfig.widgets,
    text: {
        ...BasicConfig.widgets.text,
        factory: (props) => <BootstrapTextWidget {...props} />
    },
    textarea: {
        ...BasicConfig.widgets.textarea,
        factory: (props) => <BootstrapTextAreaWidget {...props} />
    },
    number: {
        ...BasicConfig.widgets.number,
        factory: (props) => <BootstrapNumberWidget {...props} />
    },
    multiselect: {
        ...BasicConfig.widgets.multiselect,
        factory: (props) => <BootstrapMultiSelectWidget {...props} />
    },
    select: {
        ...BasicConfig.widgets.select,
        factory: (props) => <BootstrapSelectWidget {...props} />
    },
    slider: {
        ...BasicConfig.widgets.slider,
        factory: (props) => <BootstrapSliderWidget {...props} />
    },
    boolean: {
        ...BasicConfig.widgets.boolean,
        factory: (props) => <BootstrapBooleanWidget {...props} />
    },
    date: {
        ...BasicConfig.widgets.date,
        factory: (props) => <BootstrapDateWidget {...props} />
    },
    time: {
        ...BasicConfig.widgets.time,
        factory: (props) => <BootstrapTimeWidget {...props} />
    },
    datetime: {
        ...BasicConfig.widgets.datetime,
        factory: (props) => <BootstrapDateTimeWidget {...props} />
    }
};

const types = {
    ...BasicConfig.types
};

export default {
    ...BasicConfig,
    types,
    widgets,
    settings
};
