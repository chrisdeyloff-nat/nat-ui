
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useCreateNotifications, NOTIFICATION_TYPE } from 'features/notifications/useNotifications'

function useCrudRequestHandler({thunkMethod, onSuccessMessage, onValidationFailed, initialParameters, showDefaultError = true, onSuccess, onFailure}) {
    const dispatch = useDispatch(); 
    const [createNotification] = useCreateNotifications();

    const handler = async (params) => {
        const {payload} = await dispatch(thunkMethod(params));

        if (payload?.failureReason === undefined)
        {
            if (onSuccessMessage !== undefined) createNotification(onSuccessMessage, NOTIFICATION_TYPE.success);
            if (onSuccess !== undefined) onSuccess({input: params, output: payload});
            return undefined;
        }

        else if ( payload.statusCode === 422)
        {
            if (onValidationFailed !== undefined)  createNotification(onValidationFailed, NOTIFICATION_TYPE.error);
            if (onFailure !== undefined) onFailure({input: params, output: payload});
            return payload.payload;
        }

        else {
            if (showDefaultError !== undefined)  createNotification(payload.failureReason, NOTIFICATION_TYPE.error);
            if (onFailure !== undefined) onFailure({input: params, output: payload});
            return payload.payload;
        }
    }

    useEffect(()=> {
        if ( initialParameters !== undefined ) handler(initialParameters);
    })

    return handler;
}

export default useCrudRequestHandler;