import React from 'react';
import './App.css';
import { Calculator } from './calculator/Calculator';
import { CalculatorHistory } from './calculator/history/CalculatorHistory';
import { CalculatorService } from './calculator/CalculatorService';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.service = new CalculatorService();
        this.state = {
            isCalculatorShown: true,
        };
    }

    toggleIsCalculatorShown() {
        const state = {
            isCalculatorShown: !this.state.isCalculatorShown,
        };
        this.setState(state);
    }

    render() {
        return (
            <div className="calculator-app">
                <div
                    className="button toggle-history"
                    onClick={() => this.toggleIsCalculatorShown()}
                >
                    {this.state.isCalculatorShown ? `Show History` : `Show Calculator`}
                </div>
                {this.state.isCalculatorShown ? <Calculator service={this.service} /> : <CalculatorHistory service={this.service} />}
            </div>
        );
    }
}
