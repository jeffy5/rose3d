import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import classNames from 'classnames';
import includes from 'lodash/includes';
import Anchor from '../../components/Anchor';
import Notifications from '../../components/Notifications';
import TipTrigger from '../../components/TipTrigger';
import { NumberInput as Input } from '../../components/Input';
import i18n from '../../lib/i18n';
import confirm from '../../lib/confirm';
import widgetStyles from '../styles.styl';
import { actions as printingActions } from '../../flux/printing';
import styles from './styles.styl';


const OFFICIAL_CONFIG_KEYS = [
    'layer_height',
    'speed_wall_x',
    'infill_sparse_density',
    'support_type',
    'top_thickness'
];

const officialConfigMap = {
    layer_height: {
        showValue: true,
        options: {
            pla: {
                normal_quality: [
                    { label: 'Rough', value: 0.12 },
                    { label: 'Media', value: 0.16 },
                    { label: 'Fine', value: 0.2 }
                ],
                fast_print: [
                    { label: 'Rough', value: 0.16 },
                    { label: 'Media', value: 0.2 },
                    { label: 'Fine', value: 0.25 }
                ],
                high_quality: [
                    { label: 'Rough', value: 0.06 },
                    { label: 'Media', value: 0.08 },
                    { label: 'Fine', value: 0.12 }
                ],
                race_quality: [
                    { label: 'Rough', value: 0.16 },
                    { label: 'Media', value: 0.2 },
                    { label: 'Fine', value: 0.25 }
                ]
            },
            tpu: {
                normal_quality: [
                    { label: 'Rough', value: 0.12 },
                    { label: 'Media', value: 0.16 },
                    { label: 'Fine', value: 0.2 }
                ],
                fast_print: [
                    { label: 'Rough', value: 0.16 },
                    { label: 'Media', value: 0.2 },
                    { label: 'Fine', value: 0.25 }
                ]
            },
            petg: {
                normal_quality: [
                    { label: 'Rough', value: 0.12 },
                    { label: 'Media', value: 0.16 },
                    { label: 'Fine', value: 0.2 }
                ],
                fast_print: [
                    { label: 'Rough', value: 0.18 },
                    { label: 'Media', value: 0.2 },
                    { label: 'Fine', value: 0.25 }
                ]
            },
            abs: {
                normal_quality: [
                    { label: 'Rough', value: 0.16 },
                    { label: 'Media', value: 0.18 },
                    { label: 'Fine', value: 0.2 }
                ]
            }
        }
    },
    speed_wall_x: {
        showValue: true,
        options: {
            pla: {
                normal_quality: [
                    { label: 'Slow', value: 70 },
                    { label: 'Medium', value: 80 },
                    { label: 'Fast', value: 90 }
                ],
                fast_print: [
                    { label: 'Slow', value: 75 },
                    { label: 'Medium', value: 85 },
                    { label: 'Fast', value: 100 }
                ],
                high_quality: [
                    { label: 'Slow', value: 40 },
                    { label: 'Medium', value: 60 },
                    { label: 'Fast', value: 70 }
                ],
                race_quality: [
                    { label: 'Slow', value: 70 },
                    { label: 'Medium', value: 80 },
                    { label: 'Fast', value: 90 }
                ]
            },
            tpu: {
                normal_quality: [
                    { label: 'Slow', value: 35 },
                    { label: 'Medium', value: 45 },
                    { label: 'Fast', value: 55 }
                ],
                fast_print: [
                    { label: 'Slow', value: 45 },
                    { label: 'Medium', value: 55 },
                    { label: 'Fast', value: 60 }
                ]
            },
            petg: {
                normal_quality: [
                    { label: 'Slow', value: 40 },
                    { label: 'Medium', value: 50 },
                    { label: 'Fast', value: 60 }
                ],
                fast_print: [
                    { label: 'Slow', value: 70 },
                    { label: 'Medium', value: 80 },
                    { label: 'Fast', value: 90 }
                ]
            },
            abs: {
                normal_quality: [
                    { label: 'Slow', value: 35 },
                    { label: 'Medium', value: 45 },
                    { label: 'Fast', value: 55 }
                ]
            }
        }
    },
    infill_sparse_density: {
        showValue: true,
        options: {
            pla: {
                normal_quality: [
                    { label: 'Thin', value: 5 },
                    { label: 'Medium', value: 10 },
                    { label: 'Strong', value: 15 }
                ],
                fast_print: [
                    { label: 'Thin', value: 2 },
                    { label: 'Medium', value: 5 },
                    { label: 'Strong', value: 10 }
                ],
                high_quality: [
                    { label: 'Thin', value: 2 },
                    { label: 'Medium', value: 5 },
                    { label: 'Strong', value: 10 }
                ],
                race_quality: [
                    { label: 'Thin', value: 10 },
                    { label: 'Medium', value: 20 },
                    { label: 'Strong', value: 30 }
                ]
            },
            tpu: {
                normal_quality: [
                    { label: 'Thin', value: 2 },
                    { label: 'Medium', value: 5 },
                    { label: 'Strong', value: 10 }
                ],
                fast_print: [
                    { label: 'Thin', value: 5 },
                    { label: 'Medium', value: 10 },
                    { label: 'Strong', value: 15 }
                ]
            },
            petg: {
                normal_quality: [
                    { label: 'Thin', value: 5 },
                    { label: 'Medium', value: 10 },
                    { label: 'Strong', value: 15 }
                ],
                fast_print: [
                    { label: 'Thin', value: 5 },
                    { label: 'Medium', value: 10 },
                    { label: 'Strong', value: 15 }
                ]
            },
            abs: {
                normal_quality: [
                    { label: 'Thin', value: 5 },
                    { label: 'Medium', value: 10 },
                    { label: 'Strong', value: 15 }
                ]
            }
        }
    },
    support_type: {
        showValue: false,
        options: {
            pla: {
                normal_quality: [
                    {
                        label: 'Build Plate',
                        value: 'buildplate',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'Everywhere',
                        value: 'everywhere',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'None',
                        deps: [
                            { key: 'support_enable', value: false }
                        ]
                    }
                ],
                fast_print: [
                    {
                        label: 'Build Plate',
                        value: 'buildplate',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'Everywhere',
                        value: 'everywhere',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'None',
                        deps: [
                            { key: 'support_enable', value: false }
                        ]
                    }
                ],
                high_quality: [
                    {
                        label: 'Build Plate',
                        value: 'buildplate',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'Everywhere',
                        value: 'everywhere',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'None',
                        deps: [
                            { key: 'support_enable', value: false }
                        ]
                    }
                ],
                race_quality: [
                    {
                        label: 'Build Plate',
                        value: 'buildplate',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'Everywhere',
                        value: 'everywhere',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'None',
                        deps: [
                            { key: 'support_enable', value: false }
                        ]
                    }
                ]
            },
            tpu: {
                normal_quality: [
                    {
                        label: 'Build Plate',
                        value: 'buildplate',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'Everywhere',
                        value: 'everywhere',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'None',
                        deps: [
                            { key: 'support_enable', value: false }
                        ]
                    }
                ],
                fast_print: [
                    {
                        label: 'Build Plate',
                        value: 'buildplate',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'Everywhere',
                        value: 'everywhere',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'None',
                        deps: [
                            { key: 'support_enable', value: false }
                        ]
                    }
                ]
            },
            petg: {
                normal_quality: [
                    {
                        label: 'Build Plate',
                        value: 'buildplate',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'Everywhere',
                        value: 'everywhere',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'None',
                        deps: [
                            { key: 'support_enable', value: false }
                        ]
                    }
                ],
                fast_print: [
                    {
                        label: 'Build Plate',
                        value: 'buildplate',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'Everywhere',
                        value: 'everywhere',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'None',
                        deps: [
                            { key: 'support_enable', value: false }
                        ]
                    }
                ]
            },
            abs: {
                normal_quality: [
                    {
                        label: 'Build Plate',
                        value: 'buildplate',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'Everywhere',
                        value: 'everywhere',
                        deps: [
                            { key: 'support_enable', value: true }
                        ]
                    },
                    {
                        label: 'None',
                        deps: [
                            { key: 'support_enable', value: false }
                        ]
                    }
                ]
            }
        },
        checkSelected: (optionValue, settingValue, settings) => {
            if (!optionValue) {
                // None 是否没支撑
                return !settings.support_enable.default_value;
            }
            return settings.support_enable.default_value && optionValue === settingValue;
        }
    },
    top_thickness: {
        showValue: false,
        options: {
            pla: {
                normal_quality: [
                    { label: 'Skirt', value: 0.8 },
                    { label: 'Brim', value: 1.2 },
                    { label: 'Raft', value: 1.6 }
                ],
                fast_print: [
                    { label: 'Skirt', value: 0.8 },
                    { label: 'Brim', value: 1.2 },
                    { label: 'Raft', value: 1.6 }
                ],
                high_quality: [
                    { label: 'Skirt', value: 0.8 },
                    { label: 'Brim', value: 1.2 },
                    { label: 'Raft', value: 1.6 }
                ],
                race_quality: [
                    { label: 'Skirt', value: 0.8 },
                    { label: 'Brim', value: 1.2 },
                    { label: 'Raft', value: 1.6 }
                ]
            },
            tpu: {
                normal_quality: [
                    { label: 'Skirt', value: 0.8 },
                    { label: 'Brim', value: 1.2 },
                    { label: 'Raft', value: 1.6 }
                ],
                fast_print: [
                    { label: 'Skirt', value: 0.8 },
                    { label: 'Brim', value: 1.2 },
                    { label: 'Raft', value: 1.6 }
                ]
            },
            petg: {
                normal_quality: [
                    { label: 'Skirt', value: 0.8 },
                    { label: 'Brim', value: 1.2 },
                    { label: 'Raft', value: 1.6 }
                ],
                fast_print: [
                    { label: 'Skirt', value: 0.8 },
                    { label: 'Brim', value: 1.2 },
                    { label: 'Raft', value: 1.6 }
                ]
            },
            abs: {
                normal_quality: [
                    { label: 'Skirt', value: 0.8 },
                    { label: 'Brim', value: 1.2 },
                    { label: 'Raft', value: 1.6 }
                ]
            }
        }
    }
};

const isOfficialMaterial = (materialType) => {
    return includes(['pla', 'tpu', 'petg', 'abs'], materialType);
};

const isSupportOfficalDefinition = (materialType, printDefinition) => {
    if (materialType === 'pla') {
        return true;
    } else if (materialType === 'tpu') {
        return includes([
            'quality.fast_print', 'quality.normal_quality'
        ], printDefinition.definitionId);
    } else if (materialType === 'petg') {
        return includes([
            'quality.fast_print', 'quality.normal_quality'
        ], printDefinition.definitionId);
    } else if (materialType === 'abs') {
        return includes([
            'quality.normal_quality'
        ], printDefinition.definitionId);
    }
    return false;
};

function isDefinitionEditable(definition) {
    return !definition.metadata.readonly;
}
function isOfficialDefinition(definition) {
    return includes([
        'quality.fast_print',
        'quality.normal_quality',
        'quality.high_quality',
        'quality.race_quality',
        'quality.fast_print_petg',
        'quality.fast_print_tpu',
        'quality.normal_quality_abs',
        'quality.normal_quality_petg',
        'quality.normal_quality_tpu'
    ], definition.definitionId);
}

// config type: official ('fast print', 'normal quality', 'high quality'); custom: ...
// do all things by 'config name'
class Configurations extends PureComponent {
    static propTypes = {
        setTitle: PropTypes.func.isRequired,
        isAdvised: PropTypes.bool.isRequired,
        // series: PropTypes.string.isRequired,
        activeDefinition: PropTypes.object.isRequired,
        defaultMaterialId: PropTypes.string.isRequired,
        defaultQualityId: PropTypes.string.isRequired,
        qualityDefinitions: PropTypes.array.isRequired,
        updateDefinitionSettings: PropTypes.func.isRequired,
        updateActiveDefinition: PropTypes.func.isRequired,
        duplicateQualityDefinition: PropTypes.func.isRequired,
        removeQualityDefinition: PropTypes.func.isRequired,
        updateQualityDefinitionName: PropTypes.func.isRequired,

        updateDefaultAdvised: PropTypes.func.isRequired,
        updateDefaultQualityId: PropTypes.func.isRequired
    };

    state = {
        // control UI
        notificationMessage: '',

        isOfficialTab: true,
        officialQualityDefinition: null,
        customQualityDefinition: null,

        supportKey: 'support_enable',
        supportValue: false,
        // rename custom config
        newName: null,
        isRenaming: false,

        showCustomOptions: false,

        // custom config
        customDefinitionOptions: [],
        customConfigGroup: [
            {
                name: i18n._('Quality'),
                expanded: false,
                fields: [
                    'layer_height',
                    'layer_height_0',
                    'initial_layer_line_width_factor'
                ]
            },
            {
                name: i18n._('Shell'),
                expanded: false,
                fields: [
                    'wall_thickness',
                    'top_thickness',
                    'bottom_thickness',
                    'outer_inset_first'
                ]
            },
            {
                name: i18n._('Infill'),
                expanded: false,
                fields: [
                    'infill_sparse_density'
                ]
            },
            {
                name: i18n._('Speed'),
                expanded: false,
                fields: [
                    // 'speed_print',
                    'speed_print_layer_0',
                    'speed_infill',
                    'speed_wall_0',
                    'speed_wall_x',
                    'speed_topbottom',
                    'speed_travel',
                    'speed_travel_layer_0'
                ]
            },
            {
                name: i18n._('Retract & Z Hop'),
                expanded: false,
                fields: [
                    'retraction_enable',
                    'retract_at_layer_change',
                    'retraction_amount',
                    'retraction_speed',
                    'retraction_hop_enabled',
                    'retraction_hop'
                ]
            },
            {
                name: i18n._('Surface'),
                expanded: false,
                fields: [
                    'magic_spiralize',
                    'magic_mesh_surface_mode'
                ]
            },
            {
                name: i18n._('Adhesion'),
                expanded: false,
                fields: [
                    'adhesion_type',
                    'skirt_line_count',
                    'brim_line_count',
                    'raft_margin'
                ]
            },
            {
                name: i18n._('Support'),
                expanded: false,
                fields: [
                    'support_enable',
                    'support_type',
                    'support_pattern',
                    'support_infill_rate',
                    'support_angle'
                ]
            },
            {
                name: i18n._('Dual'),
                expanded: false,
                fields: [
                    'prime_tower_enable',
                    'prime_tower_size',
                    'prime_tower_min_volume',
                    'prime_tower_position_x',
                    'prime_tower_position_y',
                    'switch_extruder_retraction_amount'
                ]
            }
        ]
    };

    actions = {
        showNotification: (msg) => {
            this.setState({
                notificationMessage: msg
            });
        },
        clearNotification: () => {
            this.setState({
                notificationMessage: ''
            });
        },
        onSelectOfficialDefinition: (definition) => {
            this.setState({
                isOfficialTab: true,
                officialQualityDefinition: definition
            });
            // this.actions.onChangeDefinitionTemporary(definition.)
            this.props.updateDefaultQualityId(definition.definitionId);
            this.props.updateActiveDefinition(definition);
            this.actions.onChangeDefinitionTemporary(this.state.supportKey, this.state.supportValue);
        },
        onSelectCustomDefinitionById: (definitionId) => {
            const definition = this.props.qualityDefinitions.find(d => d.definitionId === definitionId);

            // has to update defaultQualityId
            this.props.updateDefaultQualityId(definitionId);
            this.actions.onSelectCustomDefinition(definition);
        },
        onSelectCustomDefinition: (definition) => {
            this.setState({
                isOfficialTab: false,
                customQualityDefinition: definition,
                isRenaming: false
            });
            // this.props.updateDefaultQualityId(definition.definitionId);
            this.props.updateActiveDefinition(definition);
        },
        // Extended operations
        onChangeNewName: (event) => {
            this.setState({
                newName: event.target.value
            });
        },
        onRenameDefinitionStart: () => {
            if (!this.state.isRenaming) {
                const definition = this.state.customQualityDefinition;
                this.setState({
                    isRenaming: true,
                    newName: definition.name
                });
            } else {
                this.actions.onRenameDefinitionEnd();
            }
        },
        onRenameDefinitionEnd: async () => {
            const definition = this.state.customQualityDefinition;
            const { newName } = this.state;

            if (newName === definition.name) { // unchanged
                this.setState({
                    isRenaming: false
                });
                return;
            }

            try {
                await this.props.updateQualityDefinitionName(definition, newName);
            } catch (err) {
                this.actions.showNotification(err);
            }

            // Update options
            const customDefinitionOptions = this.props.qualityDefinitions.map(d => ({
                label: d.name,
                value: d.definitionId
            }));

            this.setState({
                isRenaming: false,
                customDefinitionOptions
            });
        },
        onChangeCustomDefinition: (key, value) => {
            const definition = this.state.customQualityDefinition;
            if (!isDefinitionEditable(definition)) {
                return;
            }

            definition.settings[key].default_value = value;

            this.props.updateDefinitionSettings(definition, {
                [key]: { default_value: value }
            });
            this.props.updateActiveDefinition({
                ownKeys: [key],
                settings: {
                    [key]: { default_value: value }
                }
            });
        },
        onChangeDefinitionTemporary: (key, value) => {
            const definition = this.state.customQualityDefinition;

            definition.settings[key].default_value = value;

            this.setState({
                supportKey: key,
                SupportDefinition: value === false ? 'none' : value,
                supportValue: value
            });

            this.props.updateActiveDefinition({
                ownKeys: [key],
                settings: {
                    [key]: { default_value: value }
                }
            });
        },
        onDuplicateDefinition: async () => {
            const definition = this.state.customQualityDefinition;
            const newDefinition = await this.props.duplicateQualityDefinition(definition);

            // Select new definition after creation
            this.actions.onSelectCustomDefinition(newDefinition);
        },
        onRemoveDefinition: async () => {
            const definition = this.state.customQualityDefinition;
            await confirm({
                body: `Are you sure to remove profile "${definition.name}"?`
            });

            await this.props.removeQualityDefinition(definition);
            this.props.updateDefaultQualityId('quality.normal_quality');

            // After removal, select the first definition
            if (this.props.qualityDefinitions.length) {
                this.actions.onSelectCustomDefinition(this.props.qualityDefinitions[0]);
            }
        },
        onSetOfficoalTab: (isAdvised) => {
            if (isAdvised) {
                this.setState({
                    isOfficialTab: true
                });
            } else {
                this.setState({
                    isOfficialTab: false
                });
            }
            this.props.updateDefaultQualityId('quality.normal_quality');
            this.props.updateDefaultAdvised(isAdvised);
        },
        toggleShowCustom: () => {
            this.setState({
                showCustomOptions: !this.state.showCustomOptions
            });
        }
    };

    constructor(props) {
        super(props);
        this.props.setTitle(i18n._('Printing Settings'));
    }

    componentDidUpdate() {
        const materialType = this.props.defaultMaterialId.replace('material.', '');
        if (!isOfficialMaterial(materialType) && this.state.isOfficialTab) {
            this.actions.onSetOfficoalTab(false);
        }
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.qualityDefinitions !== this.props.qualityDefinitions) {
            const newState = {};

            // First load initialization
            if (this.props.qualityDefinitions.length === 0) {
                const definition = nextProps.qualityDefinitions.find(d => d.definitionId === 'quality.normal_quality');
                Object.assign(newState, {
                    SupportDefinition: 'none',
                    isOfficialTab: true,
                    officialQualityDefinition: definition,
                    customQualityDefinition: definition
                });

                this.props.updateActiveDefinition(definition);
            } else {
                const officialQualityDefinition = nextProps.qualityDefinitions.find(d => d.definitionId === this.state.officialQualityDefinition.definitionId)
                    || nextProps.qualityDefinitions.find(d => d.definitionId === 'quality.normal_quality');
                const customQualityDefinition = nextProps.qualityDefinitions.find(d => d.definitionId === this.state.customQualityDefinition.definitionId)
                    || nextProps.qualityDefinitions.find(d => d.definitionId === 'quality.normal_quality');
                Object.assign(newState, {
                    officialQualityDefinition: officialQualityDefinition,
                    customQualityDefinition: customQualityDefinition
                });
                this.props.updateActiveDefinition(officialQualityDefinition);
                this.props.updateActiveDefinition(customQualityDefinition);
            }

            // Update custom definition options
            const customDefinitionOptions = nextProps.qualityDefinitions.map(d => ({
                label: d.name,
                value: d.definitionId
            }));
            Object.assign(newState, {
                customDefinitionOptions: customDefinitionOptions
            });

            this.setState(newState);
        }


        if (nextProps.isAdvised !== this.props.isAdvised) {
            if (nextProps.isAdvised) {
                this.actions.onSetOfficoalTab(true);
            } else {
                this.actions.onSetOfficoalTab(false);
            }
            if (nextProps.defaultQualityId !== this.props.defaultQualityId) {
                const definition = this.props.qualityDefinitions.find(d => d.definitionId === nextProps.defaultQualityId);
                if (nextProps.isAdvised) {
                    this.actions.onSelectOfficialDefinition(definition);
                } else {
                    this.actions.onSelectCustomDefinition(definition);
                }
            }
        } else if (nextProps.defaultQualityId !== this.props.defaultQualityId) {
            const definition = this.props.qualityDefinitions.find(d => d.definitionId === nextProps.defaultQualityId);
            if (nextProps.isAdvised) {
                this.actions.onSelectOfficialDefinition(definition);
            } else {
                this.actions.onSelectCustomDefinition(definition);
            }
        }
    }

    render() {
        const state = this.state;
        const actions = this.actions;

        const fastPrintDefinition = this.props.qualityDefinitions.find(d => d.definitionId === 'quality.fast_print');
        const normalQualityDefinition = this.props.qualityDefinitions.find(d => d.definitionId === 'quality.normal_quality');
        const highQualityDefinition = this.props.qualityDefinitions.find(d => d.definitionId === 'quality.high_quality');
        const raceQualityDefinition = this.props.qualityDefinitions.find(d => d.definitionId === 'quality.race_quality');
        // const series = this.props.series;

        const { isOfficialTab, officialQualityDefinition, customQualityDefinition, customDefinitionOptions, SupportDefinition, showCustomOptions } = this.state;
        const qualityDefinition = isOfficialTab ? officialQualityDefinition : customQualityDefinition;
        const activeDefinition = this.props.activeDefinition;

        const materialType = this.props.defaultMaterialId.replace('material.', '');
        const qualityDefinitionType = qualityDefinition !== null
            ? qualityDefinition.definitionId.replace('quality.', '')
            : '';

        if (!qualityDefinition) {
            return null;
        }

        const editable = isDefinitionEditable(qualityDefinition);

        return (
            <div className={styles['configuration-options-container']}>
                {isOfficialTab && (
                    <div className={styles['configuration-options']} style={{ fontSize: '10px' }}>
                        <div className={styles['preset-options']}>
                            <div className={styles['options-btn-list']}>
                                {isSupportOfficalDefinition(materialType, normalQualityDefinition) && (
                                    <button
                                        type="button"
                                        style={{ width: '25%' }}
                                        className={classNames(styles['options-btn'], { [styles.selected]: qualityDefinition === normalQualityDefinition })}
                                        onClick={() => {
                                            this.actions.onSelectOfficialDefinition(normalQualityDefinition);
                                        }}
                                    >
                                        {i18n._('Normal Quality')}
                                    </button>
                                )}
                                {isSupportOfficalDefinition(materialType, fastPrintDefinition) && (
                                    <button
                                        type="button"
                                        style={{ width: '25%' }}
                                        className={classNames(styles['options-btn'], { [styles.selected]: qualityDefinition === fastPrintDefinition })}
                                        onClick={() => {
                                            this.actions.onSelectOfficialDefinition(fastPrintDefinition);
                                        }}
                                    >
                                        {i18n._('Fast Print')}
                                    </button>
                                )}
                                {isSupportOfficalDefinition(materialType, highQualityDefinition) && (
                                    <button
                                        type="button"
                                        style={{ width: '25%' }}
                                        className={classNames(styles['options-btn'], { [styles.selected]: qualityDefinition === highQualityDefinition })}
                                        onClick={() => {
                                            this.actions.onSelectOfficialDefinition(highQualityDefinition);
                                        }}
                                    >
                                        {i18n._('High Quality')}
                                    </button>
                                )}
                                {isSupportOfficalDefinition(materialType, raceQualityDefinition) && (
                                    <button
                                        type="button"
                                        style={{ width: '25%' }}
                                        className={classNames(styles['options-btn'], { [styles.selected]: qualityDefinition === raceQualityDefinition })}
                                        onClick={() => {
                                            this.actions.onSelectOfficialDefinition(raceQualityDefinition);
                                        }}
                                    >
                                        {i18n._('Race Mode')}
                                    </button>
                                )}
                            </div>
                            <div style={{ display: 'none' }}>
                                <Anchor
                                    className={styles['btn-expand']}
                                    onClick={() => this.actions.toggleShowCustom()}
                                >
                                    {showCustomOptions && <i className="fa fa-fw fa-chevron-up" />}
                                    {!showCustomOptions && <i className="fa fa-fw fa-chevron-down" />}
                                </Anchor>
                            </div>
                        </div>
                    </div>
                )}
                {isOfficialTab && false && (
                    <div className="rose-tabs" style={{ marginTop: '12px', fontSize: '10px' }}>
                        <button
                            type="button"
                            style={{ width: '33%' }}
                            className={classNames('rose-tab', { 'rose-selected': SupportDefinition === 'none' })}
                            onClick={() => {
                                this.actions.onChangeDefinitionTemporary('support_enable', false);
                            }}
                        >
                            {i18n._('None')}
                        </button>
                        <button
                            type="button"
                            style={{ width: '33%' }}
                            className={classNames('rose-tab', { 'rose-selected': SupportDefinition === 'buildplate' })}
                            onClick={() => {
                                this.actions.onChangeDefinitionTemporary('support_enable', true);
                                this.actions.onChangeDefinitionTemporary('support_type', 'buildplate');
                            }}
                        >
                            {i18n._('Touching Buildplate')}
                        </button>
                        <button
                            type="button"
                            style={{ width: '33%' }}
                            className={classNames('rose-tab', { 'rose-selected': SupportDefinition === 'everywhere' })}
                            onClick={() => {
                                this.actions.onChangeDefinitionTemporary('support_enable', true);
                                this.actions.onChangeDefinitionTemporary('support_type', 'everywhere');
                            }}
                        >
                            {i18n._('Everywhere')}
                        </button>
                    </div>
                )}
                {isOfficialTab && (
                    <div className={styles['config-container']}>
                        <div className={styles['config-header']}>
                            <span>{i18n._(qualityDefinition.name)}</span>
                        </div>
                        <div className={styles['config-list']}>
                            {OFFICIAL_CONFIG_KEYS.map((key) => {
                                const settings = activeDefinition.settings;
                                const setting = settings[key];
                                const { label, unit, default_value: defaultValue } = setting;

                                const officialConfig = officialConfigMap[key];
                                const options = officialConfig.options[materialType]
                                    ? officialConfig.options[materialType][qualityDefinitionType] || []
                                    : [];
                                return (
                                    <div className={styles['config-item']} key={key}>
                                        <div className={styles['config-item-header']}>
                                            <span>{i18n._(label)}</span>
                                            {officialConfig.showValue && <span>{defaultValue}{unit}</span>}
                                        </div>
                                        <div className={styles['config-item-form']}>
                                            <div className="rose-tabs" style={{ marginTop: '6px', marginBottom: '12px' }}>
                                                {options.map((option) => {
                                                    return (
                                                        <button
                                                            type="button"
                                                            style={{ width: '33%' }}
                                                            className={classNames('rose-tab', {
                                                                'rose-selected': officialConfig.checkSelected
                                                                    ? officialConfig.checkSelected(option.value, defaultValue, settings)
                                                                    : defaultValue === option.value })}
                                                            onClick={() => {
                                                                if (option.value) {
                                                                    this.actions.onChangeDefinitionTemporary(key, option.value);
                                                                }
                                                                if (option.deps) {
                                                                    for (const dep of option.deps) {
                                                                        this.actions.onChangeDefinitionTemporary(dep.key, dep.value);
                                                                    }
                                                                }
                                                            }}
                                                            key={option.label}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles['config-footer']}>
                            <button
                                type="button"
                                onClick={() => this.actions.onSetOfficoalTab(false)}
                            >
                                {i18n._('CUSTOMIZE')}
                            </button>
                        </div>
                    </div>
                )}
                {!isOfficialTab && (
                    <div className={styles['custom-container']}>
                        <div>
                            <span style={{
                                width: '100px',
                                lineHeight: '34px',
                                marginRight: '15px'
                            }}
                            >
                                {i18n._('Profile')}
                            </span>
                            <span style={{
                                width: '206px',
                                float: 'right'
                            }}
                            >
                                <Select
                                    backspaceRemoves={false}
                                    clearable={false}
                                    menuContainerStyle={{ zIndex: 5 }}
                                    name="profile"
                                    style={{
                                        height: 30,
                                        borderRadius: 15
                                    }}
                                    options={customDefinitionOptions}
                                    placeholder=""
                                    value={qualityDefinition.definitionId}
                                    onChange={(option) => {
                                        this.actions.onSelectCustomDefinitionById(option.value);
                                    }}
                                />
                            </span>
                        </div>
                        <div style={{ marginTop: '10px', color: '#808080' }}>
                            {!state.isRenaming && (
                                <span>{qualityDefinition.name}</span>
                            )}
                            {state.isRenaming && (
                                <React.Fragment>
                                    <input
                                        value={state.newName}
                                        onChange={actions.onChangeNewName}
                                    />
                                    <Anchor
                                        className={classNames('fa', 'fa-check', widgetStyles['fa-btn'])}
                                        onClick={actions.onRenameDefinitionEnd}
                                    />
                                </React.Fragment>
                            )}
                            <div
                                style={{
                                    display: 'inline-block',
                                    float: 'right'
                                }}
                            >
                                {!isOfficialDefinition(qualityDefinition) && (
                                    <Anchor
                                        className={classNames('fa', 'fa-edit', widgetStyles['fa-btn'])}
                                        onClick={actions.onRenameDefinitionStart}
                                    />
                                )}
                                <Anchor
                                    className={classNames('fa', 'fa-plus', widgetStyles['fa-btn'])}
                                    onClick={actions.onDuplicateDefinition}
                                />
                                {!isOfficialDefinition(qualityDefinition) && (
                                    <Anchor
                                        className={classNames('fa', 'fa-trash-o', widgetStyles['fa-btn'])}
                                        onClick={actions.onRemoveDefinition}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={classNames(widgetStyles.separator, widgetStyles['separator-underline'])} />
                        {state.notificationMessage && (
                            <Notifications bsStyle="danger" onDismiss={actions.clearNotification}>
                                {state.notificationMessage}
                            </Notifications>
                        )}
                        <div className="sm-parameter-container">
                            {this.state.customConfigGroup.map((group) => {
                                return (
                                    <div
                                        key={group.name}
                                        className={styles['custom-setting-group']}
                                        style={{ paddingBottom: group.expanded ? 10 : 0 }}
                                    >
                                        <Anchor
                                            className={styles['custom-setting-group-header']}
                                            onClick={() => {
                                                group.expanded = !group.expanded;
                                                this.setState({
                                                    customConfigGroup: JSON.parse(JSON.stringify(state.customConfigGroup))
                                                });
                                            }}
                                        >
                                            <span className="sm-parameter-header__title">{i18n._(group.name)}</span>
                                            <span className={classNames(
                                                'fa',
                                                group.expanded ? 'fa-angle-double-up' : 'fa-angle-double-down',
                                                'sm-parameter-header__indicator',
                                                'pull-right',
                                            )}
                                            />
                                        </Anchor>
                                        {group.expanded && <div className={styles.divider} />}
                                        {group.expanded && group.fields.map((key) => {
                                            const setting = qualityDefinition.settings[key];

                                            const { label, description, type, unit = '', enabled, options } = setting;
                                            const defaultValue = setting.default_value;

                                            if (typeof enabled === 'string') {
                                                if (enabled.indexOf(' and ') !== -1) {
                                                    const andConditions = enabled.split(' and ').map(c => c.trim());
                                                    for (const condition of andConditions) {
                                                        // parse resolveOrValue('adhesion_type') == 'skirt'
                                                        const enabledKey = condition.match("resolveOrValue\\('(.[^)|']*)'") ? condition.match("resolveOrValue\\('(.[^)|']*)'")[1] : null;
                                                        const enabledValue = condition.match("== ?'(.[^)|']*)'") ? condition.match("== ?'(.[^)|']*)'")[1] : null;
                                                        if (enabledKey) {
                                                            if (qualityDefinition.settings[enabledKey]) {
                                                                const value = qualityDefinition.settings[enabledKey].default_value;
                                                                if (value !== enabledValue) {
                                                                    return null;
                                                                }
                                                            }
                                                        } else {
                                                            if (qualityDefinition.settings[condition]) {
                                                                const value = qualityDefinition.settings[condition].default_value;
                                                                if (!value) {
                                                                    return null;
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    const orConditions = enabled.split(' or ')
                                                        .map(c => c.trim());
                                                    let result = false;
                                                    for (const condition of orConditions) {
                                                        const enabledKey = condition.match("resolveOrValue\\('(.[^)|']*)'") ? condition.match("resolveOrValue\\('(.[^)|']*)'")[1] : null;
                                                        const enabledValue = condition.match("== ?'(.[^)|']*)'") ? condition.match("== ?'(.[^)|']*)'")[1] : null;
                                                        if (enabledKey) {
                                                            if (qualityDefinition.settings[enabledKey]) {
                                                                const value = qualityDefinition.settings[enabledKey].default_value;
                                                                if (value === enabledValue || (value === true && enabledValue === null)) {
                                                                    result = true;
                                                                }
                                                            }
                                                        } else {
                                                            if (qualityDefinition.settings[condition]) {
                                                                const value = qualityDefinition.settings[condition].default_value;
                                                                if (value) {
                                                                    result = true;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (!result) {
                                                        return null;
                                                    }
                                                }
                                            } else if (typeof enabled === 'boolean' && enabled === false) {
                                                return null;
                                            }

                                            const opts = [];
                                            if (options) {
                                                Object.keys(options).forEach((k) => {
                                                    opts.push({
                                                        value: k,
                                                        label: i18n._(options[k])
                                                    });
                                                });
                                            }
                                            return (
                                                <TipTrigger
                                                    title={i18n._(label)}
                                                    content={i18n._(description)}
                                                    key={key}
                                                    style={{ marginTop: 4 }}
                                                >
                                                    <div className={styles['custom-setting-item']} key={key}>
                                                        <span style={{ fontWeight: 400 }}>{i18n._(label)}</span>
                                                        {type === 'float' && (
                                                            <div>
                                                                <Input
                                                                    className="sm-parameter-row__input"
                                                                    style={{ float: 'none', textAlign: 'right' }}
                                                                    value={defaultValue}
                                                                    disabled={!editable}
                                                                    onChange={(value) => {
                                                                        actions.onChangeCustomDefinition(key, value);
                                                                    }}
                                                                />
                                                                <span
                                                                    className="sm-parameter-row__input-unit"
                                                                    style={{
                                                                        float: 'none',
                                                                        position: 'relative',
                                                                        right: 0,
                                                                        width: 40,
                                                                        textAlign: 'right',
                                                                        display: 'inline-block'
                                                                    }}
                                                                >
                                                                    {unit}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {type === 'int' && (
                                                            <div>
                                                                <Input
                                                                    className="sm-parameter-row__input"
                                                                    style={{ float: 'none', textAlign: 'right' }}
                                                                    value={defaultValue}
                                                                    disabled={!editable}
                                                                    onChange={(value) => {
                                                                        actions.onChangeCustomDefinition(key, value);
                                                                    }}
                                                                />
                                                                <span
                                                                    className="sm-parameter-row__input-unit"
                                                                    style={{
                                                                        float: 'none',
                                                                        position: 'relative',
                                                                        right: 0,
                                                                        width: 40,
                                                                        textAlign: 'right',
                                                                        display: 'inline-block'
                                                                    }}
                                                                >
                                                                    {unit}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {type === 'bool' && (
                                                            <input
                                                                className="sm-parameter-row__checkbox"
                                                                type="checkbox"
                                                                checked={defaultValue}
                                                                disabled={!editable}
                                                                onChange={(event) => actions.onChangeCustomDefinition(key, event.target.checked)}
                                                            />
                                                        )}
                                                        {type === 'enum' && (
                                                            <Select
                                                                className="sm-parameter-row__select"
                                                                style={{
                                                                    height: 30,
                                                                    borderRadius: 15,
                                                                    fontSize: 12
                                                                }}
                                                                backspaceRemoves={false}
                                                                clearable={false}
                                                                menuContainerStyle={{ zIndex: 5 }}
                                                                name={key}
                                                                disabled={!editable}
                                                                options={opts}
                                                                searchable={false}
                                                                value={defaultValue}
                                                                onChange={(option) => {
                                                                    actions.onChangeCustomDefinition(key, option.value);
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </TipTrigger>
                                            );
                                        })
                                        }
                                    </div>
                                );
                            })}
                        </div>
                        {isOfficialMaterial(materialType) && (
                            <div className={styles['custom-footer']}>
                                <button
                                    type="button"
                                    onClick={() => this.actions.onSetOfficoalTab(true)}
                                >
                                    {i18n._('DEFAULT')}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { series } = state.machine;
    const {
        qualityDefinitions, defaultQualityId, isAdvised, activeDefinition,
        defaultMaterialId
    } = state.printing;
    return {
        qualityDefinitions,
        defaultQualityId,
        isAdvised,
        activeDefinition,
        series,
        defaultMaterialId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDefaultAdvised: (isAdvised) => dispatch(printingActions.updateState({ 'isAdvised': isAdvised })),
        updateDefaultQualityId: (defaultQualityId) => dispatch(printingActions.updateState({ defaultQualityId })),
        updateActiveDefinition: (definition) => dispatch(printingActions.updateActiveDefinition(definition)),
        duplicateQualityDefinition: (definition) => dispatch(printingActions.duplicateQualityDefinition(definition)),
        removeQualityDefinition: (definition) => dispatch(printingActions.removeQualityDefinition(definition)),
        updateQualityDefinitionName: (definition, name) => dispatch(printingActions.updateQualityDefinitionName(definition, name)),
        updateDefinitionSettings: (definition, settings) => dispatch(printingActions.updateDefinitionSettings(definition, settings))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Configurations);
