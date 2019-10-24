import React from 'react'
import { create } from "react-test-renderer";
import { CalculatorHistory } from './CalculatorHistory';

const service = jest.genMockFromModule('../CalculatorService');
service.getHistory = jest.fn(() => {
    return new Promise((resolve, reject) => {
        resolve(['1', '2', '3']);
    });
});

describe("CalculatorHistory Component", () => {
    test("Should ask for previous operations during initialization", () => {
        // Arrange
        create(<CalculatorHistory service={service} />);

        // Assert
        expect(service.getHistory).toBeCalledTimes(1);
    });

    test("Should display Loading message during initialization", () => {
        // Arrange
        const history = create(<CalculatorHistory service={service} />);
        const instance = history.root;
        const outputLines = instance.findAllByProps({ className: "outputLine" });

        // Assert
        expect(outputLines.length).toBe(1);
        expect(outputLines[0].props.children).toBe("Loading...");
    })
});