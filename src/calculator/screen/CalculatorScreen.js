import React from 'react';
import './CalculatorScreen.css';

function CalculatorScreen(props) {
    return (
        <div className="calculator-screen">
            {props.operations.map((line, i) => (
                <div key={i} className="outputLine">{line}</div>
            ))}
        </div>
    );
}

export { CalculatorScreen };
