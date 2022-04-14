import React from 'react';
import { makeStyles } from '@material-ui/styles';
import SuccessCheckSmall from 'images/SuccessCheckSmall.svg';
import FailureIcon from 'images/FailureIcon.svg';
import { NOTIFICATION_TYPE } from 'features/notifications/useNotifications';

const notificationStyle = makeStyles({
    success: {
        backgroundColor: '#22CB98',
        paddingLeft: '6px',
    },
    failure: {
        backgroundColor: '#D30026',
        paddingLeft: '6px',
    },
    icon: {
        padding: '14px',
        width: '24px',
    }
})

const NotificationType = ({type, hideIcon = false}) => 
{
    const classes = notificationStyle();

    if ( type === NOTIFICATION_TYPE.success) 
        return <>
            <span className={classes.success}></span>
            {hideIcon ? null : <img src={`${SuccessCheckSmall}`} className={classes.icon} alt='' />}
        </>

    if ( type === NOTIFICATION_TYPE.error)
        return <>
            <span className={classes.failure}></span>
            {hideIcon ? null : <img src={`${FailureIcon}`} className={classes.icon} alt='' />}
        </>

    return null;
}

export default NotificationType;