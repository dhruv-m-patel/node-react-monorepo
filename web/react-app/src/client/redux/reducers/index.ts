import { combineReducers } from 'redux';
import messageReducer from './message-reducer';

export interface TypeAndPayload<PayloadType> {
  type?: string;
  payload?: PayloadType;
}

export interface MessageReducerStateType {
  isFetching: boolean;
  error?: string;
  data?: Array<string>;
}

export default combineReducers({
  message: messageReducer,
});
