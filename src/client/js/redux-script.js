import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import ReduxLogger from "redux-logger";

const logger = ReduxLogger.createLogger();

// actions
//action type
const ADD_SUBSCRIBER = "ADD_SUBSCRIBER";
const ADD_VIEWCOUNT = "ADD_VIEWCOUNT";

const addSubscriber = () => {
  return {
    type: ADD_SUBSCRIBER,
  };
};
const addViewCount = () => {
  return {
    type: ADD_VIEWCOUNT,
  };
};

// reducers
const subscriberState = {
  subscribers: 200,
};
const subscriberReducer = (state = subscriberState, action) => {
  switch (action.type) {
    case ADD_SUBSCRIBER:
      return {
        ...state,
        subscribers: state.subscribers + 1,
      };
    default:
      return state;
  }
};

const viewState = {
  viewCount: 100,
};
const viewReducer = (state = viewState, action) => {
  switch (action.type) {
    case ADD_VIEWCOUNT:
      return {
        ...state,
        viewCount: state.viewCount + 1,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  view: viewReducer,
  subscriber: subscriberReducer,
});

// store
const store = createStore(rootReducer, applyMiddleware(logger));

// subscribe - view - dispatch

store.subscribe(() => {
  console.log(`subscribe: `, store.getState());
});

store.dispatch(addSubscriber());
store.dispatch(addSubscriber());
store.dispatch(addViewCount());
store.dispatch(addViewCount());
