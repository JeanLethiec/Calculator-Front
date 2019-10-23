import React from 'react';

function CalculatorScreen(props) {
    return (
        <div>
            {props.lines.map((line, i) => (
                <div key={i} className="outputLine">{line}</div>
            ))}
        </div>
    );
}

export { CalculatorScreen };
