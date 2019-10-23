import { CalculatorService } from "./CalculatorService";

let service = null;
let mockFetch = null;

describe('Calculator service', () => {

    beforeEach(() => {
        mockFetch = jest.fn((url, options) => {
            return new Promise((resolve, reject) => {
                resolve({
                    json() {
                        return new Promise((resolve, reject) => { });
                    }
                });
            })
        });
        service = new CalculatorService(mockFetch);
    })

    test('Should be initialized with an host', () => {
        const service = new CalculatorService();

        expect(service.host).toBeDefined();
    })

    test('Operations history retrieval', () => {
        // Act
        service.getHistory();

        // Assert
        expect(mockFetch).toHaveBeenCalledWith("http://localhost:8081/operation", { method: "GET" });
    })

    test('Operation saving', () => {
        // Act
        service.saveOperation("1");

        // Assert
        expect(mockFetch).toHaveBeenCalledWith("http://localhost:8081/operation", {
            method: "POST",
            body: JSON.stringify({ value: "1" }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
    })

    test('Multiple operations saving', () => {
        // Act
        service.saveOperations(["1", "2"]);

        // Assert
        expect(mockFetch).toHaveBeenNthCalledWith(1, "http://localhost:8081/operation", {
            method: "POST",
            body: JSON.stringify({ value: "1" }),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        expect(mockFetch).toHaveBeenNthCalledWith(2, "http://localhost:8081/operation", {
            method: "POST",
            body: JSON.stringify({ value: "2" }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });

    })
});
