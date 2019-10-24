import React from 'react';
import { evaluate } from 'mathjs';
import { CalculatorKeypad } from './keypad/CalculatorKeypad';
import { CalculatorScreen } from './screen/CalculatorScreen';

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
        let result = 'ERROR';
        const operation = this.state.currentOperation.join('');
        if (operation === '') {
            return;
        }
        if (this.checkExpressionIsEvaluable(operation)) {
            result = evaluate(operation);
        }
        this.setState({
            operations: [`${operation} = ${result}`, ...this.state.operations].slice(0, 10),
            currentOperation: []
        });
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
        this.props.service.saveOperations(this.state.operations);
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
                    <CalculatorScreen operations={[this.state.currentOperation.join(''), ...this.state.operations]} />
                </div>
                <div className="button save" onClick={this.save.bind(this)}>
                    Save
                </div>
            </div>
        );
    }
}
