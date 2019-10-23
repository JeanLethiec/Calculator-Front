export class CalculatorService {
    constructor() {
        this.host = "http://localhost:8081";
    }

    saveOperations(operations) {
        return Promise.all(
            operations.map(operation => this.saveOperation(operation))
        );
    }

    saveOperation(operation) {
        return fetch(this.host + '/operation', {
            method: 'POST',
            body: JSON.stringify({ value: operation }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
    }

    getHistory() {
        return fetch(this.host + '/operation', {
            method: 'GET',
        });
    }
}
