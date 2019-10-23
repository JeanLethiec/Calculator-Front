import React from 'react';
import { evaluate } from 'mathjs';
import { CalculatorKeypad } from './keypad/CalculatorKeypad';
import { CalculatorScreen } from './screen/CalculatorScreen';

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: [''],
        };
    }

    handleClick(value) {
        const lines = this.state.lines.slice();

        if (value === '=') {
            if (lines[0] === '') {
                return;
            }
            if (this.checkExpressionIsEvaluable(lines[0])) {
                lines[0] = `${lines[0]} = ${evaluate(lines[0])}`;
            } else {
                lines[0] = `${lines[0]} = ERROR`;
            }
            lines.unshift('');
        } else {
            lines[0] += value;
        }
        this.setState({ lines: lines.slice(0, 10) });
    }

    checkExpressionIsEvaluable(expression) {
        try {
            evaluate(expression);
            return true;
        } catch (error) {
            return false;
        }
    }

    save() {
        this.props.service.saveOperations(this.state.lines.slice(1));
    }

    render() {
        return (
            <div className="calculator">
                <div className="calculator-input">
                    <CalculatorKeypad
                        onClick={this.handleClick.bind(this)}
                    />
                </div>
                <div className="calculator-screen">
                    <CalculatorScreen lines={this.state.lines} />
                </div>
                <div className="button save" onClick={this.save.bind(this)}>
                    Save
                </div>
            </div>
        );
    }
}
