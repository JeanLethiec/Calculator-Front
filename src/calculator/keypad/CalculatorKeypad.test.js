import React from 'react'
import { create } from "react-test-renderer";
import { CalculatorKeypad } from './CalculatorKeypad';


describe("CalculatorKeypad Component", () => {
    test('Should be consistent versus Snapshot', () => {
        // Arrange
        const keypad = create(<CalculatorKeypad onClick={() => { }} />);

        // Assert
        expect(keypad.toJSON()).toMatchSnapshot();
    });

    test("Should initialize correct keys", () => {
        // Arrange
        const keypad = create(<CalculatorKeypad onClick={() => { }} />);
        const instance = keypad.root;
        const keys = instance.findAllByType('button');
        const equalsKey = instance.findByProps({ className: 'equals key' });
        const specialKeys = instance.findAllByProps({ className: 'special key' });

        // Assert
        expect(keys.length).toBe(16);
        expect(equalsKey).toBeDefined();
        expect(specialKeys.length).toBe(4);
    });

    test("Should call onClick() when keys are clicked", () => {
        // Arrange
        const mockOnClick = jest.fn(() => { });

        const keypad = create(<CalculatorKeypad onClick={mockOnClick} />);
        const instance = keypad.root;

        // Act
        const equalsKey = instance.findByProps({ className: 'equals key' });
        equalsKey.props.onClick();
        const fiveKey = instance.findByProps({ children: '5' });
        fiveKey.props.onClick();
        const plusKey = instance.findByProps({ children: '+' });
        plusKey.props.onClick();

        // Assert
        expect(mockOnClick).toBeCalledTimes(3);
    });
});