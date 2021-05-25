import { TypeAndPayload, MessageReducerStateType } from './index';
import { Actions } from '../actions';

export const defaultState: MessageReducerStateType = {
  isFetching: false,
  error: undefined,
  data: [],
};

export default function testReducer(
  state: MessageReducerStateType = defaultState,
  action: TypeAndPayload<Array<string>> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.Message.FetchDataPending:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };

    case Actions.Message.FetchDataCompleted:
      return {
        ...state,
        isFetching: false,
        data: payload,
      };

    case Actions.Message.FetchDataFailed:
      return {
        ...state,
        isFetching: false,
        error: 'There was an error retrieving data, please try again',
      };

    default:
      return state;
  }
}
