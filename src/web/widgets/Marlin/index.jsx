import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Widget from '../../components/Widget';
import controller from '../../lib/controller';
import i18n from '../../lib/i18n';
import WidgetConfig from '../WidgetConfig';
import Marlin from './Marlin';
import {
    MARLIN
} from '../../constants';
import {
    MODAL_NONE,
    MODAL_CONTROLLER
} from './constants';
import styles from './index.styl';

class MarlinWidget extends PureComponent {
    static propTypes = {
        widgetId: PropTypes.string.isRequired,
        onFork: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        sortable: PropTypes.object
    };

    config = new WidgetConfig(this.props.widgetId);
    state = this.getInitialState();
    actions = {
        toggleFullscreen: () => {
            const { minimized, isFullscreen } = this.state;
            this.setState({
                minimized: isFullscreen ? minimized : false,
                isFullscreen: !isFullscreen
            });
        },
        toggleMinimized: () => {
            const { minimized } = this.state;
            this.setState({ minimized: !minimized });
        },
        openModal: (name = MODAL_NONE, params = {}) => {
            this.setState({
                modal: {
                    name: name,
                    params: params
                }
            });
        },
        closeModal: () => {
            this.setState({
                modal: {
                    name: MODAL_NONE,
                    params: {}
                }
            });
        },
        updateModalParams: (params = {}) => {
            this.setState({
                modal: {
                    ...this.state.modal,
                    params: {
                        ...this.state.modal.params,
                        ...params
                    }
                }
            });
        }
    };
    controllerEvents = {
        'serialport:open': (options) => {
            const { port, controllerType } = options;
            this.setState({
                isReady: controllerType === MARLIN,
                port: port
            });
        },
        'serialport:close': (options) => {
            const initialState = this.getInitialState();
            this.setState({ ...initialState });
        },
        'Marlin:state': (state) => {
            this.setState({
                controller: {
                    ...this.state.controller,
                    type: MARLIN,
                    state: state
                }
            });
        },
        'Marlin:settings': (settings) => {
            this.setState({
                controller: {
                    ...this.state.controller,
                    type: MARLIN,
                    settings: settings
                }
            });
        }
    };

    componentDidMount() {
        this.addControllerEvents();
    }
    componentWillUnmount() {
        this.removeControllerEvents();
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            minimized
        } = this.state;

        this.config.set('minimized', minimized);
    }
    getInitialState() {
        return {
            minimized: this.config.get('minimized', false),
            isFullscreen: false,
            isReady: (controller.loadedControllers.length === 1) || (controller.type === MARLIN),
            canClick: true, // Defaults to true
            port: controller.port,
            controller: {
                type: controller.type,
                state: controller.state,
                settings: controller.settings
            },
            modal: {
                name: MODAL_NONE,
                params: {}
            }
        };
    }
    addControllerEvents() {
        Object.keys(this.controllerEvents).forEach(eventName => {
            const callback = this.controllerEvents[eventName];
            controller.on(eventName, callback);
        });
    }
    removeControllerEvents() {
        Object.keys(this.controllerEvents).forEach(eventName => {
            const callback = this.controllerEvents[eventName];
            controller.off(eventName, callback);
        });
    }
    canClick() {
        const { port } = this.state;
        const { type } = this.state.controller;

        if (!port) {
            return false;
        }
        if (type !== MARLIN) {
            return false;
        }

        return true;
    }
    render() {
        const { widgetId } = this.props;
        const { minimized, isFullscreen, isReady } = this.state;
        const isForkedWidget = widgetId.match(/\w+:[\w\-]+/);
        const state = {
            ...this.state,
            canClick: this.canClick()
        };
        const actions = {
            ...this.actions
        };

        return (
            <Widget fullscreen={isFullscreen}>
                <Widget.Header>
                    <Widget.Title>
                        <Widget.Sortable className={this.props.sortable.handleClassName}>
                            <i className="fa fa-bars" />
                            <span className="space" />
                        </Widget.Sortable>
                        Marlin
                        {isForkedWidget &&
                        <i className="fa fa-code-fork" style={{ marginLeft: 5 }} />
                        }
                    </Widget.Title>
                    <Widget.Controls className={this.props.sortable.filterClassName}>
                        {isReady &&
                        <Widget.Button
                            onClick={(event) => {
                                actions.openModal(MODAL_CONTROLLER);
                            }}
                        >
                            <i className="fa fa-info" />
                        </Widget.Button>
                        }
                        {isReady &&
                        <Widget.DropdownButton
                            toggle={<i className="fa fa-th-large" />}
                        >
                            <Widget.DropdownMenuItem
                                onSelect={() => controller.writeln('M114')}
                                disabled={!state.canClick}
                            >
                                {i18n._('Current Position (M114)')}
                            </Widget.DropdownMenuItem>
                        </Widget.DropdownButton>
                        }
                        {isReady &&
                        <Widget.Button
                            disabled={isFullscreen}
                            title={minimized ? i18n._('Expand') : i18n._('Collapse')}
                            onClick={actions.toggleMinimized}
                        >
                            <i
                                className={classNames(
                                    'fa',
                                    { 'fa-chevron-up': !minimized },
                                    { 'fa-chevron-down': minimized }
                                )}
                            />
                        </Widget.Button>
                        }
                        <Widget.DropdownButton
                            title={i18n._('More')}
                            toggle={<i className="fa fa-ellipsis-v" />}
                            onSelect={(eventKey) => {
                                if (eventKey === 'fullscreen') {
                                    actions.toggleFullscreen();
                                } else if (eventKey === 'fork') {
                                    this.props.onFork();
                                } else if (eventKey === 'remove') {
                                    this.props.onRemove();
                                }
                            }}
                        >
                            <Widget.DropdownMenuItem eventKey="fullscreen" disabled={!isReady}>
                                <i
                                    className={classNames(
                                        'fa',
                                        'fa-fw',
                                        { 'fa-expand': !isFullscreen },
                                        { 'fa-compress': isFullscreen }
                                    )}
                                />
                                <span className="space space-sm" />
                                {!isFullscreen ? i18n._('Enter Full Screen') : i18n._('Exit Full Screen')}
                            </Widget.DropdownMenuItem>
                            <Widget.DropdownMenuItem eventKey="fork">
                                <i className="fa fa-fw fa-code-fork" />
                                <span className="space space-sm" />
                                {i18n._('Fork Widget')}
                            </Widget.DropdownMenuItem>
                            <Widget.DropdownMenuItem eventKey="remove">
                                <i className="fa fa-fw fa-times" />
                                <span className="space space-sm" />
                                {i18n._('Remove Widget')}
                            </Widget.DropdownMenuItem>
                        </Widget.DropdownButton>
                    </Widget.Controls>
                </Widget.Header>
                {isReady &&
                <Widget.Content
                    className={classNames(
                        styles.widgetContent,
                        { [styles.hidden]: minimized }
                    )}
                >
                    <Marlin
                        state={state}
                        actions={actions}
                    />
                </Widget.Content>
                }
            </Widget>
        );
    }
}

export default MarlinWidget;