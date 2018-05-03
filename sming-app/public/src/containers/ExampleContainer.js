import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { renderExampleText } from '../actions';

import ExampleArea from '../components/ExampleArea';

function mapStateToProps(state) {
    return {
        text: state.example.text
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        renderExampleText
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ExampleArea);