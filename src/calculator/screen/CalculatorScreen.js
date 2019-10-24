import React from 'react';

function CalculatorScreen(props) {
    return (
        <div>
            {props.operations.map((line, i) => (
                <div key={i} className="outputLine">{line}</div>
            ))}
        </div>
    );
}

export { CalculatorScreen };
