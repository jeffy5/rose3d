// React
import { useEffect } from 'react';

// PropTypes
import PropTypes from 'prop-types';

const PrintDefinitionWatcher = ({
    qualityDefinition,
    onChange
}) => {
    useEffect(() => {
        onChange(qualityDefinition);
    }, [qualityDefinition]);

    return null;
};

PrintDefinitionWatcher.PropTypes = {
    qualityDefinition: PropTypes.object,
    onChange: PropTypes.func
};

export default PrintDefinitionWatcher;
