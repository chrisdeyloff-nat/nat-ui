import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notifications",
    initialState: [],
    reducers: {

        add: (state, action) => {
            const notification = {...action.payload, active: false, hash: Date.now().valueOf() }
            if ( notification.type !== undefined && notification.message !== undefined )
            {    
                state.push(notification);
            }

            if ( notification.type !== undefined && notification.message !== undefined && notification.spread === true ) 
            {
                localStorage.setItem("spreadedNotificationMessages", JSON.stringify(notification));
                localStorage.setItem("spreadedNotificationMessages", null);
            }

            return state;
        },

        activate: (state, action) => 
        {
            const currentNotification = action.payload;
            const firstElement = state[0];

            if ( firstElement !== undefined && firstElement.active === false && firstElement.hash === currentNotification.hash)
            {
                const activeNotification = {...firstElement, active: true};
                state[0] = activeNotification;
            }

            return state;
        },

        dismiss: (state, action) => {
            const notification = action.payload;
            const firstElement = state[0];

            if ( firstElement !== undefined && firstElement.active === true && notification.hash === firstElement.hash)
            {
                state.shift();
            }

            return state;
        },

        load: (state, action) => {
            const event = JSON.parse(action.payload);
            const notification = {...event, active: false, hash: Date.now().valueOf() }

            if ( notification.type !== undefined && notification.message !== undefined )
            {    
                state.push(notification);
            }

            return state;
        },

        clear: (state) => {
            state = [];
            return state;
        },
    },
});
  
export const { actions } = notificationSlice;
export default notificationSlice.reducer;