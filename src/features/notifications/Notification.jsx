import React, { useEffect } from 'react'
import { useDisplayNotifications } from 'features/notifications/useNotifications'
import DesktopToast from 'features/notifications/DesktopToast'

const Toast = () => {
    const [currentNotification, show, dismiss] = useDisplayNotifications();

    useEffect(() => {
        if (currentNotification !== undefined && currentNotification.active === false)
        {
            show(currentNotification);
        }
    }, [currentNotification, show]);

    if ( currentNotification !== undefined && currentNotification.active === true )
    return <DesktopToast notification={currentNotification} dismiss={dismiss} />

    else return null;
}

export default Toast;