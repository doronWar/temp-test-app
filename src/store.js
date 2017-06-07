import {createStore, combineReducers} from 'redux'
import Temp from './Reducers/Temp'

import LogicTemp from './Reducers/LogicTemp'


const reducer = combineReducers({
  Temp,
  LogicTemp,
});

const store = createStore(reducer);

export default store;

