import {RENDER_EXAMPLE_TEXT} from '../actions'

export default function(state = {text: ''}, action) {
    switch (action.type) {
        case RENDER_EXAMPLE_TEXT:
            const text = action.text;
            return {
                // ...state,
                text
            };
        default:
            return state;
    }
}