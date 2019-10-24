import React from 'react'
import { create } from "react-test-renderer";
import { Calculator } from './Calculator';

const service = jest.genMockFromModule('./CalculatorService');
service.saveOperations = jest.fn(() => { });

describe('Calculator component', () => {

    test('should accept valid calculations expressions', () => {
        const calculator = create(<Calculator service={service} />);
        const instance = calculator.getInstance();

        expect(instance.isExpressionEvaluable("1 + 1")).toBe(true);
        expect(instance.isExpressionEvaluable("1 - 1")).toBe(true);
        expect(instance.isExpressionEvaluable("1 * 1")).toBe(true);
        expect(instance.isExpressionEvaluable("1 / 1")).toBe(true);
        expect(instance.isExpressionEvaluable("1.2")).toBe(true);
        expect(instance.isExpressionEvaluable("1")).toBe(true);
        expect(instance.isExpressionEvaluable("1.3 - 1.4")).toBe(true);
    })

    test('should reject invalid calculations expressions', () => {
        const calculator = create(<Calculator service={service} />);
        const instance = calculator.getInstance();

        expect(instance.isExpressionEvaluable("1 // 1")).toBe(false);
        expect(instance.isExpressionEvaluable("1 /* 1")).toBe(false);
        expect(instance.isExpressionEvaluable("..")).toBe(false);
        expect(instance.isExpressionEvaluable(".")).toBe(false);
        expect(instance.isExpressionEvaluable("+")).toBe(false);
        expect(instance.isExpressionEvaluable("-")).toBe(false);
        expect(instance.isExpressionEvaluable("/")).toBe(false);
        expect(instance.isExpressionEvaluable("*")).toBe(false);
    })

    test('should save current operation when clicking on save button', () => {
        // Arrange
        const calculator = create(<Calculator service={service} />);
        const root = calculator.root;
        const saveButton = root.findByProps({ className: "button save" });

        // Act
        saveButton.props.onClick();

        // Assert
        expect(service.saveOperations).toBeCalled();
    })

    test('should update state when user interacts with keypad', () => {
        // Arrange
        const calculator = create(<Calculator service={service} />);
        const instance = calculator.getInstance();

        // Spying on the setState method, because the current test renderer doe not allow state verifications.
        // Using Enzyme could be a way to achieve that.
        spyOn(instance, 'setState').and.callThrough();

        // Act
        instance.handleClick("5");
        instance.handleClick("+");
        instance.handleClick("=");
        instance.handleClick("1");
        instance.handleClick("+");
        instance.handleClick("1");
        instance.handleClick("=");

        // Assert
        expect(instance.setState).toHaveBeenNthCalledWith(1, { currentOperation: ["5"] });
        expect(instance.setState).toHaveBeenNthCalledWith(2, { currentOperation: ["5", "+"] });
        expect(instance.setState).toHaveBeenNthCalledWith(3, { currentOperation: [], operations: ["5+ = ERROR"] });
        expect(instance.setState).toHaveBeenNthCalledWith(4, { currentOperation: ["1"] });
        expect(instance.setState).toHaveBeenNthCalledWith(5, { currentOperation: ["1", "+"] });
        expect(instance.setState).toHaveBeenNthCalledWith(6, { currentOperation: ["1", "+", "1"] });
        expect(instance.setState).toHaveBeenNthCalledWith(7, { currentOperation: [], operations: ["1+1 = 2", "5+ = ERROR"] });
    });

    test('should ask to save previously executed operations when clicking on save button', () => {
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
    });

    test('should update state when user modified current operation', () => {
        // Arrange
        const calculator = create(<Calculator service={service} />);
        const instance = calculator.getInstance();

        // Spying on the setState method, because the current test renderer doe not allow state verifications.
        // Using Enzyme could be a way to achieve that.
        spyOn(instance, 'setState').and.callThrough();

        // Act
        instance.modifyCurrentOperation("5");

        // Assert
        expect(instance.setState).toHaveBeenCalledWith({ currentOperation: ["5"] });
    });

    test('should update state when user executes current operation', () => {
        // Arrange
        const calculator = create(<Calculator service={service} />);
        const instance = calculator.getInstance();

        // Spying on methods, because the current test renderer doe not allow state verifications.
        // Using Enzyme could be a way to achieve that.
        spyOn(instance, 'setState').and.callThrough();
        spyOn(instance, 'isExpressionEvaluable').and.callThrough();

        // Act
        instance.modifyCurrentOperation("5");
        instance.modifyCurrentOperation("+");
        instance.modifyCurrentOperation("4");
        instance.executeCurrentOperation();

        // Assert
        expect(instance.setState).toHaveBeenLastCalledWith({ currentOperation: [], operations: ["5+4 = 9"] });
        expect(instance.isExpressionEvaluable).toHaveBeenCalledWith("5+4");
    });
});
