import React, { Component } from 'react';
import Button from './Button';

const ExampleArea = ({text, renderExampleText}) => {

    return (
        <div>
            <Button key="Click" text="Click me" style="btn-info" onClick={renderExampleText} />
            <h1>{text}</h1>
        </div>
    );
}

export default ExampleArea;