import React from 'react';

export class CalculatorKeypad extends React.Component {
    renderKey(value, ...classNames) {
        classNames = classNames.concat(['key']);
        return (
            <button className={classNames.join(' ')} onClick={() => this.props.onClick(value)}>
                {value}
            </button>
        );
    }

    render() {
        return (
            <div>
                <div className="input-row">
                    {this.renderKey('7')}
                    {this.renderKey('8')}
                    {this.renderKey('9')}
                    {this.renderKey('/', 'special')}
                </div>
                <div className="input-row">
                    {this.renderKey('4')}
                    {this.renderKey('5')}
                    {this.renderKey('6')}
                    {this.renderKey('*', 'special')}
                </div>
                <div className="input-row">
                    {this.renderKey('1')}
                    {this.renderKey('2')}
                    {this.renderKey('3')}
                    {this.renderKey('-', 'special')}
                </div>
                <div className="input-row">
                    {this.renderKey('0')}
                    {this.renderKey('.')}
                    {this.renderKey('=', 'equals')}
                    {this.renderKey('+', 'special')}
                </div>
            </div>
        );
    }
}
