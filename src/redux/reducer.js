import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';
import notifs from './modules/notifs';
import createagenda from './modules/createagenda';

export default function createReducers(asyncReducers) {
  return {
    routing: routerReducer,
    reduxAsyncConnect,
    online: (v = true) => v,
    form,
    notifs,
    createagenda,
    // widgets,
    // survey,
    // chat,
    ...asyncReducers
  };
}
