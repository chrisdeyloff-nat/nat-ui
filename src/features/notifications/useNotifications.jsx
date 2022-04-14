import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions } from 'features/notifications/notification.slice'
import NOTIFICATION_TYPE from 'consts/notificationType'

const useDisplayNotifications = () => {

    const currentNotification = useSelector(state => state.app.notifications[0]);
    const dispatch = useDispatch();
    
    const show = (notification) => 
    {
        dispatch(actions.activate(notification));
    }

    const dismiss = (notification) => 
    {
        if ( notification.dismissable === true )
        {    
            dispatch(actions.dismiss(notification));
        }
    }

    useEffect(() =>
    {
        if ( currentNotification !== undefined && currentNotification.active === true )
        {
            setTimeout(function() {
                const dismisableNotification = currentNotification;
                dispatch(actions.dismiss(dismisableNotification));
            }, currentNotification.timeout);
        }

    }, [currentNotification, dispatch])

    const isNewNotificationEvent = (event) => {
        return event !== undefined && event.type === 'storage' && event.key === 'spreadedNotificationMessages' && event.newValue !== null;
    }

    window.onstorage = event => {
        if ( isNewNotificationEvent(event))
        {
            dispatch(actions.load(event.newValue));
        }
    };

    return [currentNotification, show, dismiss]
};

const useCreateNotifications = () => {

    const dispatch = useDispatch();
    
    const create = (message, type, spread = false, dismissable = true, timeout = 5000) => 
    {
        const notification = { message, type, spread, dismissable, timeout };
        dispatch(actions.add(notification));
    }

    return [create]
};

export { useDisplayNotifications, useCreateNotifications, NOTIFICATION_TYPE }