// React
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// PropTypes
import PropTypes from 'prop-types';

// Style
import styles from './styles.styl';

const RoseProgressBar = ({
    tips = '',
    progress = 0
}) => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (progress <= 0) {
            setIsShow(false);
        } else if (progress >= 100) {
            setTimeout(() => {
                setIsShow(false);
            }, 1000);
        } else {
            setIsShow(true);
        }
    }, [progress, useEffect]);

    if (!isShow) {
        return null;
    }
    return createPortal((
        <div className={styles['modal-overlay']}>
            <div className={styles['progress-dialog-container']}>
                <div className={styles['progress-info']}>
                    <span>{ tips }</span>
                    <span style={{ fontSize: 12, color: '#00000080' }}>{ parseInt(progress, 10) }%</span>
                </div>

                <div className={styles['progress-bar-bg']}>
                    <div
                        className={styles['progress-bar']}
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    ), document.body);
};

RoseProgressBar.propTypes = {
    progress: PropTypes.number,
    tips: PropTypes.string
};

export default RoseProgressBar;
