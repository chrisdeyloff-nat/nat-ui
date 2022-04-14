import { combineReducers } from '@reduxjs/toolkit';
import featureReducer from 'features/features.reducer';

const appReducer = combineReducers({
    ...featureReducer
})

export default appReducer;