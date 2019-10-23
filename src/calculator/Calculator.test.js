import React from 'react'
import { create } from "react-test-renderer";
import { Calculator } from './Calculator';


const service = jest.genMockFromModule('./CalculatorService');
service.saveOperations = jest.fn(() => { });

describe('Calculator component', () => {

    test('checkCurrentExpressionIsEvaluable positive test', () => {
        const calculator = create(<Calculator service={service} />);
        const instance = calculator.getInstance();

        expect(instance.checkExpressionIsEvaluable("1 + 1")).toBe(true);
        expect(instance.checkExpressionIsEvaluable("1 - 1")).toBe(true);
        expect(instance.checkExpressionIsEvaluable("1 * 1")).toBe(true);
        expect(instance.checkExpressionIsEvaluable("1 / 1")).toBe(true);
        expect(instance.checkExpressionIsEvaluable("1.2")).toBe(true);
        expect(instance.checkExpressionIsEvaluable("1")).toBe(true);
    })

    test('checkCurrentExpressionIsEvaluable negative test', () => {
        const calculator = create(<Calculator service={service} />);
        const instance = calculator.getInstance();

        expect(instance.checkExpressionIsEvaluable("1 // 1")).toBe(false);
        expect(instance.checkExpressionIsEvaluable("1 /* 1")).toBe(false);
        expect(instance.checkExpressionIsEvaluable("..")).toBe(false);
        expect(instance.checkExpressionIsEvaluable(".")).toBe(false);
    })

    test('Click on save button should call service', () => {
        // Arrange
        const calculator = create(<Calculator service={service} />);
        const root = calculator.root;
        const saveButton = root.findByProps({ className: "button save" });

        // Act
        saveButton.props.onClick();

        // Assert
        expect(service.saveOperations).toBeCalled();
    })

    test('Successive handle clicks should create data that will be sent to the service', () => {
        // Arrange
        const calculator = create(<Calculator service={service} />);
        const root = calculator.root;
        const instance = calculator.getInstance();
        const saveButton = root.findByProps({ className: "button save" });

        // Act
        instance.handleClick("5");
        instance.handleClick("+");
        instance.handleClick("=");
        instance.handleClick("1");
        instance.handleClick("+");
        instance.handleClick("1");
        instance.handleClick("=");

        saveButton.props.onClick();

        // Assert
        expect(service.saveOperations).toBeCalledWith(["1+1 = 2", "5+ = ERROR"]);
    })
});
