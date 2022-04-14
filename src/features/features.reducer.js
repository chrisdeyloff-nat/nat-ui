import coinCalcSlice from "features/coinCalc/coin-calc.slice";
import notificationSlice from "features/notifications/notification.slice";

const reducers = {
  coinCalc: coinCalcSlice,
  notifications: notificationSlice,
};

export default reducers;
