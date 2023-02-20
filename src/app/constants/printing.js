export const OFFICIAL_CONFIG_KEYS = [
    'layer_height',
    'speed_wall_x',
    'infill_sparse_density',
    'support_type',
    'adhesion_type'
];

export const OFFICIAL_CONFIG_MAP = {
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
    adhesion_type: {
        showValue: false,
        options: {
            pla: {
                normal_quality: [
                    { label: 'Skirt', value: 'skirt' },
                    { label: 'Brim', value: 'brim' },
                    { label: 'None', value: 'none' }
                ],
                fast_print: [
                    { label: 'Skirt', value: 'skirt' },
                    { label: 'Brim', value: 'brim' },
                    { label: 'None', value: 'none' }
                ],
                high_quality: [
                    { label: 'Skirt', value: 'skirt' },
                    { label: 'Brim', value: 'brim' },
                    { label: 'None', value: 'none' }
                ],
                race_quality: [
                    { label: 'Skirt', value: 'skirt' },
                    { label: 'Brim', value: 'brim' },
                    { label: 'None', value: 'none' }
                ]
            },
            tpu: {
                normal_quality: [
                    { label: 'Skirt', value: 'skirt' },
                    { label: 'Brim', value: 'brim' },
                    { label: 'None', value: 'none' }
                ],
                fast_print: [
                    { label: 'Skirt', value: 'skirt' },
                    { label: 'Brim', value: 'brim' },
                    { label: 'None', value: 'none' }
                ]
            },
            petg: {
                normal_quality: [
                    { label: 'Skirt', value: 'skirt' },
                    { label: 'Brim', value: 'brim' },
                    { label: 'None', value: 'none' }
                ],
                fast_print: [
                    { label: 'Skirt', value: 'skirt' },
                    { label: 'Brim', value: 'brim' },
                    { label: 'None', value: 'none' }
                ]
            },
            abs: {
                normal_quality: [
                    { label: 'Skirt', value: 'skirt' },
                    { label: 'Brim', value: 'brim' },
                    { label: 'None', value: 'none' }
                ]
            }
        }
    }
};

export const MATERIAL_DEFAULT_DEFINITION_MAP = {
    pla: 'quality.normal_quality',
    tpu: 'quality.normal_quality_tpu',
    petg: 'quality.normal_quality_petg',
    abs: 'quality.normal_quality_abs'
};
