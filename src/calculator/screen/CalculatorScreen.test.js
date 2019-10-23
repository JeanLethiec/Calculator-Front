import React from 'react'
import { create } from "react-test-renderer";
import { CalculatorScreen } from './CalculatorScreen';


describe("CalculatorScreen Component", () => {
    test('Should be consistent versus Snapshot', () => {
        // Arrange
        const screen = create(<CalculatorScreen lines={['1', '2', '3']} />);

        // Assert
        expect(screen.toJSON()).toMatchSnapshot();
    });

    test("Should initialize correct lines", () => {
        // Arrange
        const screen = create(<CalculatorScreen lines={['1', '2', '3']} />);
        const instance = screen.root;
        const keys = instance.findAllByProps({ className: "outputLine" });

        // Assert
        expect(keys.length).toBe(3);
        keys.forEach((key, i) => {
            expect(keys[i].props.children).toBe((i + 1).toString());
        })
    });
});