import React, { PureComponent } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import path from 'path';
import PropTypes from 'prop-types';
import request from 'superagent';
import FileSaver from 'file-saver';
import isElectron from 'is-electron';
import i18n from '../../lib/i18n';
import modal from '../../lib/modal';
import { actions as printingActions, PRINTING_STAGE } from '../../flux/printing';
import Thumbnail from './Thumbnail';
import ModelExporter from '../PrintingVisualizer/ModelExporter';
import { DATA_PREFIX } from '../../constants';
import styles from './styles.styl';

if (isElectron()) {
    const { ipcRenderer } = window.require('electron');
    const fs = window.require('fs');

    ipcRenderer.on('saved-gcode', (event, filename, uploadPath) => {
        if (!filename.canceled) {
            fs.copyFile(uploadPath, filename.filePath, () => {});
        }
    });

    ipcRenderer.on('saved-model', (event, filename, output) => {
        if (!filename.canceled) {
            fs.writeFile(filename.filePath, output, 'utf8', () => {});
        }
    });

    ipcRenderer.on('saved-config', (event, filename, uploadPath) => {
        if (!filename.canceled) {
            fs.copyFile(uploadPath, filename.filePath, () => {});
        }
    });
}

class Output extends PureComponent {
    static propTypes = {
        minimized: PropTypes.bool.isRequired,

        modelGroup: PropTypes.object.isRequired,
        boundingBox: PropTypes.object.isRequired,
        isGcodeOverstepped: PropTypes.bool.isRequired,
        gcodeLine: PropTypes.object,
        gcodeFile: PropTypes.object,
        hasModel: PropTypes.bool.isRequired,
        stage: PropTypes.number.isRequired,
        isAnyModelOverstepped: PropTypes.bool.isRequired,
        generateGcode: PropTypes.func.isRequired,
        createConfig: PropTypes.func.isRequired
    };

    state = {
        exportModelFormatInfo: 'stl_binary'
    };

    thumbnail = React.createRef();

    actions = {
        onClickGenerateGcode: () => {
            this.props.modelGroup.unselectAllModels();
            const thumbnail = this.thumbnail.current.getThumbnail();
            this.props.generateGcode(thumbnail);
        },
        onClickLoadGcode: () => {
            if (this.props.isGcodeOverstepped) {
                modal({
                    title: 'Warning',
                    body: 'Generated G-code overstepped out of the cube, please modify your model and re-generate G-code.'
                });
                return;
            }
            const { gcodeFile } = this.props;

            gcodeFile.thumbnail = this.thumbnail.current.getDataURL();


            document.location.href = '/#/workspace';
            window.scrollTo(0, 0);
        },
        changeFilenameExt: (filename) => {
            if (path.extname(filename) && ['.stl', '.obj'].includes(path.extname(filename).toLowerCase())) {
                const extname = path.extname(filename);
                filename = `${filename.slice(0, filename.lastIndexOf(extname))}.gcode`;
            }
            return filename;
        },
        onClickExportGcode: () => {
            if (this.props.isGcodeOverstepped) {
                modal({
                    title: 'Warning',
                    body: 'Generated G-code overstepped out of the cube, please modify your model and re-generate G-code.'
                });
                return;
            }

            const { gcodeFile } = this.props;
            const filename = path.basename(gcodeFile.name);
            const gcodeFilePath = `${DATA_PREFIX}/${gcodeFile.uploadName}`;
            if (isElectron()) {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.send('save-gcode', gcodeFile.gcodeFilePath);
            } else {
                request.get(gcodeFilePath)
                    .end((err, res) => {
                        const data = res.text;
                        const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
                        const savedFilename = filename;
                        FileSaver.saveAs(blob, savedFilename, true);
                    });
            }
        },
        onChangeExportModelFormat: (option) => {
            this.setState({
                exportModelFormatInfo: option.value
            });
        },
        onClickExportModel: () => {
            const infos = this.state.exportModelFormatInfo.split('_');
            const format = infos[0];
            const isBinary = (infos.length > 1) ? (infos[1] === 'binary') : false;
            // const output = new ModelExporter().parse(this.props.modelGroup, format, isBinary);
            const output = new ModelExporter().parse(this.props.modelGroup.object, format, isBinary);
            if (!output) {
                // export error
                return;
            }
            let fileName = 'export';
            if (format === 'stl') {
                if (isBinary === true) {
                    fileName += '_binary';
                } else {
                    fileName += '_ascii';
                }
            }
            fileName += `.${format}`;
            if (isElectron()) {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.send('save-model', `./${fileName}`, output);
            } else {
                const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
                FileSaver.saveAs(blob, fileName, true);
            }
        },
        onClickExportConfig: () => {
            this.props.createConfig();
            // const configFilePath = `${DataStorage.configDir}/active_final.def.json`;
            if (isElectron()) {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.send('save-config');
            }
        }
    };

    render() {
        const state = this.state;
        const actions = this.actions;
        const { stage, gcodeLine, hasModel } = this.props;

        const isSlicing = stage === PRINTING_STAGE.SLICING;
        const { isAnyModelOverstepped } = this.props;

        return (
            <div>
                <div>
                    {false && (
                        <table style={{ width: '100%', marginTop: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ paddingLeft: '0px', width: '50%' }}>
                                        <Select
                                            clearable={false}
                                            style={{ borderWidth: '2px' }}
                                            options={[{
                                                value: 'stl_binary',
                                                label: i18n._('STL File (Binary)')
                                            }, {
                                                value: 'stl_ascii',
                                                label: i18n._('STL File (ASCII)')
                                            }, {
                                                value: 'obj',
                                                label: i18n._('OBJ File (*.obj)')
                                            }]}
                                            value={state.exportModelFormatInfo}
                                            searchable={false}
                                            onChange={actions.onChangeExportModelFormat}
                                        />
                                    </td>
                                    <td style={{ paddingRight: '0px', width: '50%' }}>
                                        <button
                                            type="button"
                                            className="sm-btn-large sm-btn-default"
                                            style={{ width: '100%' }}
                                            disabled={!hasModel}
                                            onClick={actions.onClickExportModel}
                                        >
                                            {i18n._('Export Models')}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    {false && (
                        <table style={{ width: '100%', marginTop: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ paddingRight: '0px', width: '50%' }}>
                                        <button
                                            type="button"
                                            className="sm-btn-large sm-btn-default"
                                            style={{ width: '100%' }}
                                            onClick={actions.onClickExportConfig}
                                        >
                                            {i18n._('Export Config')}
                                        </button>
                                    </td>
                                    <td style={{ paddingRight: '0px', width: '50%' }}>
                                        <button
                                            type="button"
                                            className="sm-btn-large sm-btn-default"
                                            style={{ width: '100%' }}
                                            onClick={actions.onClickImportConfig}
                                        >
                                            {i18n._('Import Config')}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    <div style={{ background: '#3D3D3D', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 46 }}>
                        <div className={styles['output-btns-container']} style={{ width: 190 }}>
                            <button
                                type="button"
                                className={styles['output-btn']}
                                onClick={actions.onClickGenerateGcode}
                                disabled={!hasModel || isSlicing || isAnyModelOverstepped}
                            >
                                {i18n._('Slice')}
                            </button>
                            <button
                                type="button"
                                className={styles['output-btn']}
                                onClick={actions.onClickExportGcode}
                                disabled={!gcodeLine}
                            >
                                {i18n._('Save To File')}
                            </button>
                        </div>
                    </div>
                </div>
                <Thumbnail
                    ref={this.thumbnail}
                    modelGroup={this.props.modelGroup}
                    boundingBox={this.props.boundingBox}
                    minimized={this.props.minimized}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const printing = state.printing;
    const { workflowState } = state.machine;
    const {
        stage,
        modelGroup, hasModel, boundingBox, isAnyModelOverstepped,
        isGcodeOverstepped, gcodeLine, gcodeFile
    } = printing;

    return {
        workflowState,
        stage,
        modelGroup,
        boundingBox,
        hasModel,
        isAnyModelOverstepped,
        isGcodeOverstepped,
        gcodeLine,
        gcodeFile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        generateGcode: (thumbnail) => dispatch(printingActions.generateGcode(thumbnail)),
        createConfig: () => dispatch(printingActions.createConfig())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Output);
