import { POP_NOTIFICATION, PUSH_NOTIFICATION } from "./constants";

type ActionType = {
  type: string;
  payload?: any;
};

/**
 * Create reducer for useReducer
 * @param reducer - reducer object
 * Ex: {
 *    sum: (state, action) => state + action.payload,
 *    subtract: (state, action) => state - action.payload
 *  }
 */
const createReducer = (reducer: any) => (state: any, action: ActionType) =>
  reducer[action.type](state, action);

const pushNotification = (state: any, action: ActionType) => {
  const newState = state.slice(); // Clone the array with new memory space
  newState.push(action.payload);
  return newState;
};

const popNotification = (state: any) => {
  const newState = state.slice(); // Clone the array with new memory space
  newState.pop();
  return newState;
};

const notificationsReducer = {
  [PUSH_NOTIFICATION]: pushNotification,
  [POP_NOTIFICATION]: popNotification,
};

export default createReducer(notificationsReducer);
