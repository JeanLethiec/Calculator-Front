import React from 'react';
import { evaluate } from 'mathjs';
import { CalculatorKeypad } from './keypad/CalculatorKeypad';
import { CalculatorScreen } from './screen/CalculatorScreen';
import './Calculator.css';

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: [],
            currentOperation: []
        }
    }

    handleClick(value) {
        if (value === '=') {
            this.executeCurrentOperation()
        } else {
            this.modifyCurrentOperation(value);
        }
    }

    modifyCurrentOperation(value) {
        const currentOperation = this.state.currentOperation.concat(value);
        this.setState({ currentOperation });
    }

    executeCurrentOperation() {
        const operation = this.state.currentOperation.join('');
        if (operation === '') {
            return;
        }
        const result = this.isExpressionEvaluable(operation) ? evaluate(operation) : 'ERROR';
        this.setState({
            operations: [`${operation} = ${result}`, ...this.state.operations].slice(0, 10),
            currentOperation: []
        });
    }

    isExpressionEvaluable(expression) {
        try {
            evaluate(expression);
            return true;
        } catch (error) {
            return false;
        }
    }

    save() {
        this.props.service.saveOperations(this.state.operations);
    }

    render() {
        return (
            <div className="calculator">
                <CalculatorKeypad onClick={this.handleClick.bind(this)} />
                <CalculatorScreen operations={[this.state.currentOperation.join(''), ...this.state.operations]} />
                <div className="button save" onClick={this.save.bind(this)}>
                    Save
                </div>
            </div>
        );
    }
}
