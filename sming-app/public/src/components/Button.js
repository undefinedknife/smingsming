import React from 'react';

const Button = ({text, type, style, disable, extra, onClick}) => {

    type = !type ? 'button' : type;


    const className = `btn ${style?style:"btn-primary"} ${disable?"disabled" : ""} ${extra?extra:""}`;

    return (
        <button
            className={className}
            type={type}
            onClick={!disable?onClick:null}
        >
            {text}
        </button>
    );
};

export default Button;