import {
  createSlice,
  createAsyncThunk,
  // createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';

import { coinCalcApi as api } from 'api/coinCalc/coin-calc.api';
import { callAPI } from 'api/thunk.helper';

// const coinCalcAdapter = createEntityAdapter({
//   selectedAmountId: undefined
// });

const apiThunks = {
  getList: createAsyncThunk('coinCalc/get-list', async(params, thunkAPI) => await callAPI(() => api.getList(params), thunkAPI)),
  getById: createAsyncThunk('coinCalc/get-by-id', async(params, thunkAPI) => await callAPI(() => api.getById(params), thunkAPI)),
  create: createAsyncThunk('coinCalc/create', async(params, thunkAPI) => await callAPI(() => api.create(params), thunkAPI)),
  edit: createAsyncThunk('coinCalc/edit', async(params, thunkAPI) => await callAPI(() => api.edit(params), thunkAPI)),
}

const coinCalcSlice = createSlice({
  name: 'coinCalc',
  // initialState: coinCalcAdapter.getInitialState(),
  initialState: {
    currentItem: undefined,
    items: undefined,
  },
  reducers: {
    // coinCalcSetAll: coinCalcAdapter.setAll,
    // clear: coinCalcAdapter.removeAll,
    setCurrent: (state, {payload}) => {
      state.currentItem = payload;
    },
  },
  extraReducers: {

    [apiThunks.getList.pending]: (state, {meta}) => {
      state.waitingResponse = true;
    },

    [apiThunks.getList.fulfilled]: (state, {payload}) => {
      state.waitingResponse = false;
      state.items = payload;
      // coinCalcAdapter.setAll(state, payload);
    },
    [apiThunks.getList.rejected]: (state, {meta}) => {
      state.waitingResponse = false;
      state.items = undefined;
    },

    [apiThunks.getById.pending]: (state, {meta}) => {
      state.waitingResponse = true;
    },

    [apiThunks.getById.fulfilled]: (state, {payload}) => {
      state.waitingResponse = false;

      // coinCalcAdapter.upsertOne(state, {id: payload.id, data: payload});
      upsert(state.items, payload);
      state.currentItem = payload;
    },
    [apiThunks.getById.rejected]: (state, {meta}) => {
      state.waitingResponse = false;
      state.currentItem = undefined;
    },

    [apiThunks.create.pending]: (state, {meta}) => {
      state.waitingResponse = true;
    },
    [apiThunks.create.fulfilled]: (state, {payload}) => {
      state.waitingResponse = false;
      state.selectedId = payload.id;
      // coinCalcAdapter.upsertOne(state, {id: payload.id, data: payload});
      upsert(state.items, payload);
      state.currentItem = payload;
      return state;
    },
    [apiThunks.create.rejected]: (state, {meta}) => {
      state.waitingResponse = false;
    },

    [apiThunks.edit.pending]: (state, {meta}) => {
      state.waitingResponse = true;
    },
    [apiThunks.edit.fulfilled]: (state, {payload}) => {
      state.waitingResponse = false;
      // coinCalcAdapter.upsertOne(state, {id: payload.id, data: payload});
      upsert(state.items, payload);
      state.currentItem = payload;
      return state;
    },
    [apiThunks.edit.rejected]: (state, {meta}) => {
      state.waitingResponse = false;
    },
  }
});

const upsert = (items, item) => {
  if (!!!items || !!!item) return;
  const index = items.findIndex(x => x.id === item.id);
  if ( index !== -1 ) items[index] = item;
  else items[items.length] = item;
};

// const coinCalcsSelector = coinCalcAdapter.getSelectors((state) => {
//   return state.coinCalc;
// });
const itemsSelector = createSelector(state => state.app.coinCalc, slice => slice.items);
const currentItemSelector = createSelector(state => state.app.coinCalc, slice => slice.currentItem);

export const waitingResponseSelector = createSelector(
  state => state.app.coinCalc,
  slice => slice.waitingResponse
);

export const { actions } = coinCalcSlice;
export default coinCalcSlice.reducer;
export { apiThunks as coinCalcApiThunks }; //thunks
export { itemsSelector, currentItemSelector };
