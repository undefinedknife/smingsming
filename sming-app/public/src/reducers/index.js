import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ExampleReducer from './ExampleReducer';

const rootReducer = combineReducers({
    example: ExampleReducer,
    // Redux-Form
    form: formReducer
});

export default rootReducer;