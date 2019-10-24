import React from 'react';
import { CalculatorScreen } from '../screen/CalculatorScreen';

export class CalculatorHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { operations: ['Loading...'] };
    }

    render() {
        return (
            <div className="history">
                <CalculatorScreen operations={this.state.operations} />
            </div>
        );
    }

    componentDidMount() {
        this.props
            .service
            .getHistory()
            .then(data => {
                this.setState({
                    operations: data.map(operation => operation.value),
                });
            });
    }
}
