import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { ButtonBase } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import NotificationType from 'features/notifications/NotificationType'
import parse from 'html-react-parser';

const desktopStyle = makeStyles({
    position: {
        position: 'fixed',
        left: '30px',
        bottom: '50px',
        backgroundColor: '#222222',
        color: '#FFFFFF',
        maxWidth: '500px',
        width: '500px',
        minHeight: '55px',
        display: 'flex',
        borderRadius: '2px',
        zIndex: '1000000',
    },
    message: {
        padding: '18.5px 0px',
        fontSize: '14px',
        fontWeight: '400',
        maxWidth: '344px',
        width: '344px',
        display: 'block',
        alignItems: 'center',
    },
    dismiss: {
        maxWidth: '78px',
        fontSize: '16px',
        fontWeight: '600',
        margin: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Noto Sans',
    },
})

const DesktopToast = ({notification, dismiss}) => {
    const classes = desktopStyle();

    return <Slide in={true} direction="up" mountOnEnter unmountOnExit>
        <div className={classes.position}>
            <NotificationType type={notification.type} />
            <div className={classes.message}>
                {parse(notification.message)}</div>
            {notification.dismissable ? <ButtonBase className={classes.dismiss} onClick={() => dismiss(notification)}>Dismiss</ButtonBase> : null }
        </div>
    </Slide>
}

export default DesktopToast;