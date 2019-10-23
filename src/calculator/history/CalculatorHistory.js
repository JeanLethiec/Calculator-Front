import React from 'react';
import { CalculatorScreen } from '../screen/CalculatorScreen';

export class CalculatorHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { operations: ['Loading...'] };
        this.props
            .service
            .getHistory()
            .then(data => {
                this.setState({
                    operations: data.map(operation => operation.value).reverse(),
                });
            });
    }
    render() {
        return (
            <div className="history">
                <div className="calculator-screen">
                    <CalculatorScreen lines={this.state.operations} />
                </div>
            </div>
        );
    }
}
